/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import {
  Ref, useEffect, useRef, useState,
} from "react";
import type { DropResult } from "react-beautiful-dnd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import type { LoadingBarRef } from "react-top-loading-bar";
import LoadingBar from "react-top-loading-bar";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../app";
import {
  DuplicateIcon, FacebookIcon, GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MediumIcon,
  PlusIcon,
  ThreeDotsIcon,
  TrashIcon,
  TwitterIcon,
  WebsiteIcon,
} from "../../assets/icons";
import { Container } from "../../components";
import {
  Button,
  Input, Select, Spinner, Switch,
} from "../../components/ui";
import { Header } from "../../components/ui/organism";
import { Notyf } from "../../helpers";
import type { Link } from "../../services";
import { useGetLinksQuery, useUpdateLinkMutation } from "../../services";

export default function Links(): JSX.Element {
  const [links, setLinks] = useState<Link[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const { data: dataLinks, isLoading: isLoadingGetLinks, refetch } = useGetLinksQuery();
  const [updateLink, { isLoading: isUpdating }] = useUpdateLinkMutation();

  const { user } = useAppSelector(({ auth }) => auth);
  const loadingBarRef: Ref<LoadingBarRef> = useRef(null);

  const handleChange = (type: string, value: string | null, key: number): void => {
    const newLinks = links.map((link, index) => {
      if (type === "type" && index === key) {
        return { ...link, type: value };
      }

      if (type === "published" && index === key) {
        return { ...link, isPublished: !link.isPublished };
      }

      if (type.includes("link.") && index === key) {
        const [, linkType] = type.split(".");
        return { ...link, [linkType]: value };
      }

      return link;
    }) as Link[];

    setLinks(newLinks);
  };

  const handleDragEnd = (result: DropResult): void => {
    const { destination, source } = result;
    const targetIndex = destination?.index ?? 0;
    const sourceIndex = source?.index ?? 0;

    if (!Number.isInteger(targetIndex) || targetIndex === sourceIndex) return;

    const newLinks = [...links];
    const [removed] = newLinks.splice(sourceIndex, 1);

    newLinks.splice(targetIndex, 0, removed);

    setLinks(newLinks);
  };

  const handleClickAddLink = (): void => {
    const id = uuidv4();

    setLinks((prevLinks) => [
      {
        title: "",
        type: "github",
        url: "",
        isPublished: false,
        id,
      },
      ...prevLinks,
    ]);
  };

  const handleClickDelete = (id: string) => {
    const newLinks = links.filter((link) => link.id !== id);
    setLinks(newLinks);
  };

  const handleClickDuplicate = (id: string) => {
    const getLinkById = links.find((link) => link.id === id);
    if (!getLinkById) return;

    const newLink = { ...getLinkById, id: uuidv4() };

    setLinks((prevLinks) => [newLink, ...prevLinks]);
  };

  const handleClickSave = async (): Promise<void> => {
    if (!user) return;

    updateLink({
      uid: user?.uid as string,
      links,
    }).unwrap()
      .then(() => {
        Notyf.success("Links updated");
      })
      .catch(() => {
        Notyf.error("Something went wrong");
      })
      .finally(() => {
        refetch();
      });
  };

  useEffect(() => {
    if (dataLinks?.data) {
      setLinks(dataLinks.data.links);
      setIsChanged(false);
    }
  }, [dataLinks?.data]);

  useEffect(() => {
    const defaultData = JSON.stringify(dataLinks?.data?.links ?? []);
    const currentData = JSON.stringify(links);

    if (defaultData !== currentData) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [links]);

  useEffect(() => {
    const loadingBar = loadingBarRef.current;

    if (isLoadingGetLinks || isUpdating) {
      loadingBar?.continuousStart(1, 100);
    } else {
      loadingBar?.complete();
    }
  }, [isLoadingGetLinks, isUpdating]);

  const typeOptions = [
    {
      label: "Github",
      value: "github",
      icon: GithubIcon,
    },
    {
      label: "Twitter",
      value: "twitter",
      icon: TwitterIcon,
    },
    {
      label: "Facebook",
      value: "facebook",
      icon: FacebookIcon,
    },
    {
      label: "Instagram",
      value: "instagram",
      icon: InstagramIcon,
    },
    {
      label: "Linkedin",
      value: "linkedin",
      icon: LinkedinIcon,
    },
    {
      label: "Medium",
      value: "medium",
      icon: MediumIcon,
    },
    {
      label: "Website",
      value: "website",
      icon: WebsiteIcon,
    },
  ];

  return (
    <>
      <LoadingBar color="#25ced1" loaderSpeed={15} height={4} ref={loadingBarRef} />
      <Header
        title="Links"
        description="This is the links page"
      />

      <Container>
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4">
          <section className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-2xl text-dark-1">Links</h2>

              <div className="flex items-center gap-2">
                <Button.button
                  className="button-base button-primary p-2"
                  title="Add new link"
                  disabled={isUpdating}
                  onClick={handleClickAddLink}
                >
                  <PlusIcon className="w-5 h-5" />
                </Button.button>

                <Button.button
                  title="Save"
                  className="button-base button-primary p-1.5 px-4"
                  disabled={!!(!isChanged || isUpdating)}
                  onClick={handleClickSave}
                >
                  {dataLinks?.data && (
                    <>
                      {dataLinks?.data?.links.length > 0 && isUpdating && (
                        <div className="flex items-center justify-center gap-3">
                          Updating
                          {" "}
                          <Spinner size="small" />
                        </div>
                      )}

                      {dataLinks?.data?.links.length === 0 && !isUpdating && (
                        <div className="flex items-center justify-center gap-3">
                          Updating
                          {" "}
                          <Spinner size="small" />
                        </div>
                      )}
                    </>
                  )}

                  {!isUpdating && "Save"}
                </Button.button>
              </div>
            </div>

            {isLoadingGetLinks ? (
              <div className="w-full h-32 flex items-center justify-center">
                <Spinner size="large" className="border-primary" />
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col">

                      {links.map((link, index) => (
                        <Draggable key={link.id} draggableId={link.id} index={links.indexOf(link)}>
                          {(providedd) => (
                            <div
                              className={`w-full bg-white border rounded-lg border-ligt-3 my-2 pb-4 ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                              ref={providedd.innerRef}
                              {...providedd.draggableProps}
                            >
                              <div
                                className="py-1 w-full flex items-center justify-center"
                              >
                                <button type="button" className="relative w-6 h-6 flex flex-col items-center justify-center" {...providedd.dragHandleProps} title="Drag">
                                  <ThreeDotsIcon className="absolute translate-y-0.5 w-4 h-4" />
                                  <ThreeDotsIcon className="absolute -translate-y-0.5 w-4 h-4" />
                                </button>
                              </div>

                              <div className="px-4">
                                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-between gap-2 mt-2 mb-2">
                                  <Select
                                    parentClassName="w-full sm:w-[150px] md:w-full lg:w-[150px]"
                                    className="bg-light-2 w-full sm:w-[150px] md:w-full lg:w-[150px]"
                                    data={typeOptions}
                                    value={typeOptions.find((option) => option.value === link.type)?.value ?? link.type}
                                    index={index}
                                    name="type"
                                    onChange={handleChange}
                                  />

                                  <Input.input
                                    className="w-full input-base px-3 py-2"
                                    placeholder="Link title"
                                    name="title"
                                    title="Change link title"
                                    value={link.title}
                                    onChange={(e) => handleChange("link.title", e.target.value, index)}
                                  />
                                </div>

                                <Input.input
                                  className="w-full input-base px-3 py-2 mb-4"
                                  placeholder="URL of the link"
                                  name="url"
                                  value={link.url}
                                  onChange={(e) => handleChange("link.url", e.target.value, index)}
                                />

                                <div className="flex items-center justify-between border-t border-t-light-3 pt-2">
                                  <div className="flex items-center gap-2">
                                    <span>Published</span>

                                    <Switch
                                      id={link.id}
                                      title="Published"
                                      checked={link.isPublished}
                                      onChange={() => handleChange("published", null, index)}
                                    />
                                  </div>

                                  <div className="items-center gap-4">
                                    <Button.button
                                      className="p-2 hover:text-primary focus:text-primary"
                                      title="Delete link"
                                      onClick={(): void => handleClickDuplicate(link.id)}
                                    >
                                      <DuplicateIcon className="w-5 h-5" />
                                    </Button.button>

                                    <Button.button
                                      className="p-2 hover:text-error focus:text-error"
                                      title="Delete link"
                                      onClick={(): void => handleClickDelete(link.id)}
                                    >
                                      <TrashIcon className="w-5 h-5" />
                                    </Button.button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </section>

          <section className="flex-1">
            <h2 className="font-bold text-2xl text-dark-1">Preview</h2>

            {isLoadingGetLinks ? (
              <div className="w-full h-32 flex items-center justify-center">
                <Spinner size="large" className="border-primary" />
              </div>
            ) : (
              <div className="flex flex-col gap-4 p-6 border border-light-3 rounded-lg mt-7">
                {links.map((link) => {
                  // eslint-disable-next-line max-len
                  const LinkIcon = typeOptions.find((option) => option.value === link.type)?.icon as React.ComponentType<{ className?: string }>;

                  return (
                    <a href={link.url || "#"} key={link.id} className="flex items-center justify-start text-base font-semibold p-4 rounded-lg border border-transparent hover:border-light-3 shadow-md shadow-light-3 gap-6" target="_blank" rel="noreferrer" title={link.url || "Link"}>
                      <LinkIcon className="w-8 h-8" />
                      {" "}
                      {link.title}
                    </a>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </Container>
    </>
  );
}
