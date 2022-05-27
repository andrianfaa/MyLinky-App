/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  memo,
  Ref, useEffect, useRef, useState,
} from "react";
import type { LoadingBarRef } from "react-top-loading-bar";
import LoadingBar from "react-top-loading-bar";
import { useAppDispatch, useAppSelector } from "../../app";
import { PencilIcon, UserIcon } from "../../assets/icons";
import { Container } from "../../components";
import {
  Button, Input, InputGroup, Spinner, Switch,
} from "../../components/ui";
import { Header } from "../../components/ui/organism";
import { setAuth } from "../../features/auth";
import { Notyf } from "../../helpers";
import type { SettingResponse } from "../../services";
import { useGetSettingQuery, useUpdateSettingMutation, useUploadProfilePhotoMutation } from "../../services";

function Setting(): JSX.Element {
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [formState, setFormState] = useState<SettingResponse>({
    generalSettings: {
      profile: {
        name: "",
        username: "",
        email: "",
        avatar: "",
        bio: "",
      },
    },
    publishSettings: {
      profile: {
        showProfilePhoto: false,
        showProfileName: false,
        showProfileUsername: false,
        showProfileBio: false,
        showProfileEmail: false,
      },
      links: {
        openLinksInNewTab: false,
        showIcon: false,
      },
    },
    uid: "",
  });

  const { data: settingData, isLoading: isLoadingSettingData, refetch } = useGetSettingQuery();
  const [updateSetting, { isLoading: isLoadingUpdateSetting }] = useUpdateSettingMutation();
  const [uploadProfilePhoto, { isLoading: isLoadingUploadPhoto }] = useUploadProfilePhotoMutation();

  const loadingBarRef: Ref<LoadingBarRef> = useRef(null);
  const { user } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;

    // eslint-disable-next-line prefer-regex-literals
    const bioPattern = new RegExp(/^[a-zA-Z0-9\s]*$/);

    if (name === "bio" && !bioPattern.test(value)) {
      return;
    }

    setFormState((prevState) => ({
      ...prevState,
      generalSettings: {
        profile: {
          ...prevState.generalSettings.profile,
          [name]: value,
        },
      },
    }));
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    updateSetting({
      uid: formState.uid,
      settings: formState,
    })
      .unwrap()
      .then((res) => {
        if (res.message === "Setting updated" || res.statusCode === 200) {
          Notyf.success("Setting updated");
          refetch();
        }
      })
      .catch((err) => {
        Notyf.error(err.message);
      });
  };

  const handleDropPhoto = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const { files } = e.dataTransfer;

    if (files.length > 0) {
      e.currentTarget.classList.remove("drag-over");

      const file = files[0];
      const formData = new FormData();

      formData.append("photo", file);

      uploadProfilePhoto(formData)
        .unwrap()
        .then((res) => {
          setTimeout(() => {
            setFormState((prevState) => ({
              ...prevState,
              generalSettings: {
                profile: {
                  ...prevState.generalSettings.profile,
                  avatar: res?.data?.url ?? prevState.generalSettings.profile.avatar,
                },
              },
            }));
          }, 500);
        })
        .catch((err) => {
          Notyf.error(err.message);
        });
    }
  };

  const handleChangeProfilePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const file = files[0];
      const formData = new FormData();

      formData.append("photo", file);

      uploadProfilePhoto(formData)
        .unwrap()
        .then((res) => {
          setTimeout(() => {
            setFormState((prevState) => ({
              ...prevState,
              generalSettings: {
                profile: {
                  ...prevState.generalSettings.profile,
                  avatar: res?.data?.url ?? prevState.generalSettings.profile.avatar,
                },
              },
            }));
          }, 500);
        })
        .catch((err) => {
          Notyf.error(err.message);
        });
    }
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>, target: string): void => {
    const { name, checked } = event.target;

    if (target === "profile") {
      setFormState((prevState) => ({
        ...prevState,
        publishSettings: {
          ...prevState.publishSettings,
          profile: {
            ...prevState.publishSettings.profile,
            [name]: checked,
          },
        },
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        publishSettings: {
          ...prevState.publishSettings,
          links: {
            ...prevState.publishSettings.links,
            [name]: checked,
          },
        },
      }));
    }
  };

  const handleClickCancel = () => {
    if (!settingData?.data) return;

    setFormState((prevState) => ({
      ...prevState,
      ...settingData?.data,
    }));
  };

  useEffect(() => {
    if (settingData?.data) {
      setFormState((prevState) => ({
        ...prevState,
        ...settingData.data,
      }));

      if (user) {
        dispatch(setAuth({
          ...user,
          avatar: formState.generalSettings.profile.avatar,
        }));
      }
    }
  }, [settingData?.data, isLoadingSettingData]);

  useEffect(() => {
    const defaultState = JSON.stringify(settingData?.data);
    const currentState = JSON.stringify(formState);

    if (defaultState !== currentState) {
      setIsChanged(false);
    } else {
      setIsChanged(true);
    }

    if (user) {
      dispatch(setAuth({
        ...user,
        avatar: formState.generalSettings.profile.avatar,
      }));
    }
  }, [formState]);

  useEffect(() => {
    const loadingBar = loadingBarRef.current;

    if (isLoadingSettingData || isLoadingUpdateSetting || isLoadingUploadPhoto) {
      loadingBar?.continuousStart(1, 100);
    } else {
      loadingBar?.complete();
    }
  }, [isLoadingSettingData, isLoadingUpdateSetting, isLoadingUploadPhoto]);

  const formInputProfile = [
    {
      name: "name",
      id: "name",
      type: "text",
      label: "Name",
      placeholder: "Name",
      value: formState.generalSettings.profile.name,
      onchange: handleOnChange,
      disabled: isLoadingSettingData || isLoadingUpdateSetting || isLoadingUploadPhoto,
    },
    {
      name: "username",
      id: "username",
      type: "text",
      label: "Username",
      placeholder: "Username",
      value: formState.generalSettings.profile.username,
      onchange: handleOnChange,
      disabled: isLoadingSettingData || isLoadingUpdateSetting || isLoadingUploadPhoto,
    },
    {
      name: "email",
      id: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      value: formState.generalSettings.profile.email,
      onchange: handleOnChange,
      disabled: isLoadingSettingData || isLoadingUpdateSetting || isLoadingUploadPhoto,
    },
  ];

  const formInputPublish = {
    profile: [
      {
        name: "showProfilePhoto",
        id: "showProfilePhoto",
        checked: formState.publishSettings.profile.showProfilePhoto,
        label: "Show profile photo",
        onchange: handleToggle,
      },
      {
        name: "showProfileName",
        id: "showProfileName",
        checked: formState.publishSettings.profile.showProfileName,
        label: "Show profile name",
        onchange: handleToggle,
      },
      {
        name: "showProfileUsername",
        id: "showProfileUsername",
        checked: formState.publishSettings.profile.showProfileUsername,
        label: "Show profile username",
        onchange: handleToggle,
      },
      {
        name: "showProfileBio",
        id: "showProfileBio",
        checked: formState.publishSettings.profile.showProfileBio,
        label: "Show profile bio",
        onchange: handleToggle,
      },
      {
        name: "showProfileEmail",
        id: "showProfileEmail",
        checked: formState.publishSettings.profile.showProfileEmail,
        label: "Show profile email",
        onchange: handleToggle,
      },
    ],
    links: [
      {
        name: "openLinksInNewTab",
        id: "openLinksInNewTab",
        checked: formState.publishSettings.links.openLinksInNewTab,
        label: "Open links in new tab",
        onchange: handleToggle,
      },
      {
        name: "showIcon",
        id: "showIcon",
        checked: formState.publishSettings.links.showIcon,
        label: "Show icon",
        onchange: handleToggle,
      },
    ],
  };

  return (
    <>
      <LoadingBar color="#25ced1" loaderSpeed={15} height={4} ref={loadingBarRef} />
      <Header
        title="Setting"
        description="This is the setting page"
      />

      <Container>
        <form onSubmit={handleUpdate} id="profile" className="w-full">
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 lg:gap-8">
            <section className="flex-1 flex-col">
              <h2 className="font-bold text-2xl text-dark-1 mb-2">
                General Setting
              </h2>

              <h3 className="font-medium text-lg text-dark-1 mb-2">
                Profile
              </h3>

              <div className="flex-1 flex-col">
                <div
                  className="flex items-center justify-center w-full p-6"
                  id="profile-avatar"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add("drag-over");
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("drag-over");
                  }}
                  onDragEnd={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("drag-over");
                  }}
                  onDrop={handleDropPhoto}
                >
                  <div
                    className="relative"
                  >
                    {formState.generalSettings.profile.avatar ? (
                      <div
                        className="w-36 h-36 lg:w-44 lg:h-44 rounded-full object-cover bg-light-2"
                      >
                        <img src={formState.generalSettings.profile.avatar} alt={formState.generalSettings.profile.name} className="w-36 h-36 lg:w-44 lg:h-44 rounded-full object-cover" />
                      </div>
                    ) : (
                      <div
                        className="w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-light-1 border-4 border-light-2 flex items-center justify-center"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add("border-primary");
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove("border-primary");
                        }}
                        onDrop={handleDropPhoto}
                      >
                        <UserIcon className="w-20 h-20 text-dark-4" />
                      </div>
                    )}

                    <label className="cursor-pointer button-base button-primary rounded-full h-9 w-9 p-0 flex items-center justify-center absolute right-1 bottom-1" title="Change profile photo">
                      <PencilIcon className="w-5 h-5 text-white" />
                      <input type="file" onChange={handleChangeProfilePhoto} accept="image/*" className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full mb-4">
                  {formInputProfile.map((input) => (
                    <InputGroup.withLabel
                      key={input.id}
                      label={input.label}
                      className="w-full"
                      targetId={input.id}
                      disabled={input.disabled}
                    >
                      <Input.input
                        name={input.name}
                        id={input.id}
                        className="input-base w-full"
                        placeholder={input.placeholder}
                        onChange={input.onchange}
                        value={input.value}
                        title={input.label}
                        type={input.type || "text"}
                        disabled={input.disabled}
                      />
                    </InputGroup.withLabel>
                  ))}

                  <InputGroup.withLabel
                    label="Bio"
                    className="w-full mb-6"
                    targetId="bio"
                    disabled={isLoadingSettingData || isLoadingUpdateSetting || isLoadingUploadPhoto}
                  >
                    <textarea
                      name="bio"
                      id="bio"
                      className="input-base w-full"
                      placeholder="Bio"
                      rows={8}
                      onChange={handleOnChange}
                      value={formState.generalSettings.profile.bio}
                      disabled={isLoadingSettingData || isLoadingUpdateSetting || isLoadingUploadPhoto}
                    />
                  </InputGroup.withLabel>
                </div>
              </div>
            </section>

            <section className="flex-1 flex-col">
              <h2 className="font-bold text-2xl text-dark-1 mb-2">
                Publish Settings
              </h2>

              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <h3 className="font-medium text-lg text-dark-1 mb-2">
                    Profile
                  </h3>

                  <div className="flex flex-col">
                    {formInputPublish.profile.map((input) => (
                      <div key={input.id} className="mb-4 flex items-center justify-between">
                        <label htmlFor={input.id} className="flex items-center">
                          {input.label}
                        </label>

                        <Switch
                          id={input.id}
                          title={input.label}
                          name={input.name}
                          checked={input.checked}
                          onChange={(e) => handleToggle(e, "profile")}
                          disabled={isLoadingSettingData || isLoadingUpdateSetting || isLoadingUploadPhoto}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-lg text-dark-1 mb-2">
                    Links
                  </h3>

                  <div className="flex flex-col">
                    {formInputPublish.links.map((input) => (
                      <div key={input.id} className="mb-4 flex items-center justify-between">
                        <label htmlFor={input.id} className="flex items-center">
                          {input.label}
                        </label>

                        <Switch
                          id={input.id}
                          title={input.label}
                          name={input.name}
                          checked={input.checked}
                          onChange={(e) => handleToggle(e, "link")}
                          disabled={isLoadingSettingData || isLoadingUpdateSetting || isLoadingUploadPhoto}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="block bottom-0 left-0 w-full mt-4">
                <Button.submit
                  title="Save"
                  className="button-base button-primary w-full mb-2"
                  disabled={isLoadingSettingData || isChanged || isLoadingUpdateSetting || isLoadingUploadPhoto}
                >
                  {isLoadingUploadPhoto && (
                    <div className="flex items-center justify-center gap-3">
                      Uploading
                      {" "}
                      <Spinner size="small" />
                    </div>
                  )}

                  {isLoadingUpdateSetting && (
                    <div className="flex items-center justify-center gap-3">
                      Saving
                      {" "}
                      <Spinner size="small" />
                    </div>
                  )}

                  {!isLoadingUploadPhoto && !isLoadingUpdateSetting && "Save"}
                </Button.submit>

                <Button.button
                  title="Cancel"
                  className="button-base button-secondary w-full"
                  disabled={isChanged}
                  onClick={handleClickCancel}
                >
                  Cancel
                </Button.button>
              </div>
            </section>
          </div>
        </form>
      </Container>
    </>
  );
}

const SettingPage = memo(Setting);

export default SettingPage;
