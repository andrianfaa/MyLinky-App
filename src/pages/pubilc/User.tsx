import { memo } from "react";
import { useLocation } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import {
  FacebookIcon, GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MediumIcon, ShareIcon, TwitterIcon,
  WebsiteIcon,
} from "../../assets/icons";
import { Container } from "../../components";
import { Button, Spinner } from "../../components/ui";
import { useGetUserQuery } from "../../services";

function User() {
  const { pathname } = useLocation();
  const username = pathname.split("/")[2];

  const { data, isLoading: isLoadingFetchProfile, isError } = useGetUserQuery(username as string);

  const handleClickShare = (): void => {
    if ("navigator" in window && "share" in navigator) {
      navigator.share({
        title: `@${data?.data?.profile.username} | MyLinky Profile`,
        url: window.location.href,
      }).then(() => {
        console.log("Thanks for sharing!");
      })
        .catch((error) => {
          console.log("Error sharing", error);
        });
    } else {
      console.log("Share is not supported");
    }
  };

  const type = [
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

  if (isLoadingFetchProfile) {
    return (
      <Container className="px-6 py-10 flex flex-col items-center justify-center min-h-screen bg-light-2">
        <div className="text-center">
          <Spinner className="border-primary" size="large" />
        </div>
      </Container>
    );
  }

  if (isError) {
    window.location.href = "/";
  }

  return (
    <Container className="px-6 py-10 flex flex-col items-center justify-center min-h-screen bg-light-2">
      {data?.data && (
        <div className="flex flex-col justify-start items-center w-full max-w-[500px] relative">

          {("navigator" in window && "share" in navigator) && (
            <Button.button
              className="button-base p-2 absolute top-0 right-0"
              onClick={handleClickShare}
            >
              <ShareIcon className="w-6 h-6" />
            </Button.button>
          )}

          <Fade triggerOnce direction="up" duration={750}>
            {" "}
            <section id="profile" className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {data.data.profile.avatar && (
                <img src={data?.data?.profile.avatar} alt="avatar" className="rounded-full min-h-[128px] max-h-[130px] min-w-[128px] max-w-[130px] object-cover" />
              )}

              <div className={`text-center ${data.data.profile.avatar ? "sm:text-left" : ""}`}>
                {data?.data?.profile.username && (
                  <small className="text-sm py-1 px-2 mb-2 inline-block rounded-md bg-dark-1 text-white">
                    {data?.data?.profile.username}
                  </small>
                )}

                {data?.data?.profile.name && (
                  <h1 className="text-3xl sm:text-4xl tracking-tight font-bold text-dark-1 mb-2">{data?.data?.profile.name}</h1>
                )}

                {data?.data?.profile.bio && (
                  <p className="text-base">{data?.data?.profile.bio}</p>
                )}
              </div>
            </section>
          </Fade>

          <section id="links" className="flex flex-col gap-4 w-full mt-10">
            <Fade cascade direction="up" duration={750} delay={250}>
              {data?.data?.links && data?.data?.links.length > 0 && (
                data?.data?.links.map((link) => {
                // eslint-disable-next-line max-len
                  const LinkIcon = type.find((option) => option.value === link.type)?.icon as React.ComponentType<{ className?: string }>;

                  if (data?.data?.openInNewTab) {
                    return (
                      <a
                        href={link.url || "#"}
                        key={link.id}
                        className={
                          `bg-white bg-opacity-50 hover:bg-opacity-100 focus:bg-opacity-100 h-[70px] flex items-center text-base font-semibold p-4 rounded-lg border border-transparent hover:border-light-3 shadow-md shadow-light-3 gap-6 w-full hover:text-dark-1 focus:text-dark-1 transition-all duration-300 ease-in-out hover:scale-[1.025] focus:scale-[1.025] 
                      ${data?.data?.showIcon ? "justify-start" : "text-center justify-center"}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        title={link.url || "Link"}
                      >
                        {data?.data?.showIcon && <LinkIcon className="w-8 h-8" />}
                        {" "}
                        {link.title}
                      </a>
                    );
                  }

                  return (
                    <a
                      href={link.url || "#"}
                      key={link.id}
                      className={
                        `bg-white bg-opacity-50 hover:bg-opacity-100 focus:bg-opacity-100 h-[70px] flex items-center text-base font-semibold p-4 rounded-lg border border-transparent hover:border-light-3 shadow-md shadow-light-3 gap-6 w-full hover:text-dark-1 focus:text-dark-1 transition-all duration-300 ease-in-out hover:scale-[1.025] focus:scale-[1.025] 
                    ${data?.data?.showIcon ? "justify-start" : "text-center justify-center"}`
                      }
                      title={link.url || "Link"}
                    >
                      {data?.data?.showIcon && <LinkIcon className="w-8 h-8" />}
                      {" "}
                      {link.title}
                    </a>
                  );
                })
              )}
            </Fade>
          </section>

        </div>
      )}
    </Container>
  );
}

const UserPage = memo(User);

export default UserPage;
