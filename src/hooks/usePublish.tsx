/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import { usePublishMutation } from "../services/variables-services";
import { Spinner } from "../components/ui";
import { PublishFailIcon, PublishSuccessIcon } from "../assets/icons";
import { useAppSelector } from "../app";

export function usePublish() {
  const [modalOpen, setModalOpen] = useState(false);
  const [publishData, { isLoading, isError }] = usePublishMutation();

  const { user } = useAppSelector(({ auth }) => auth);

  const publish = async () => {
    setModalOpen(true);
    publishData().unwrap();
  };

  // eslint-disable-next-line consistent-return
  const render = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

    if (modalOpen) {
      return (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-end sm:items-center justify-center bg-black bg-opacity-50" onClick={() => setModalOpen(false)}>
          <div className=" bg-white w-full sm:max-w-[425px] flex flex-col items-center rounded-tr-lg rounded-tl-lg sm:rounded-lg p-6" onClick={(e) => e.stopPropagation()}>
            {isLoading ? (
              <>
                <Spinner size="large" className="border-primary w-[150px] h-[150px] border-[15px] mb-4" />
                <h2 className="text-dark-1 font-bold text-lg md:text-2xl">
                  Publishing...
                </h2>
              </>
            ) : (isError ? (
              <>
                <PublishFailIcon className="mb-4 w-[150px] h-[150px]" />
                <h2 className="text-dark-1 font-bold text-lg md:text-2xl">
                  Failed to publish
                </h2>
              </>
            ) : (
              <>
                <PublishSuccessIcon className="mb-4 w-[150px] h-[150px]" />
                <h2 className="font-bold text-lg md:text-2xl text-dark-1">
                  Published Successfully
                </h2>
                <a
                  href={`${baseUrl}/u/${user?.username}`}
                  target="_blank"
                  className="block mt-4 button-base button-primary"
                  rel="noopener noreferrer"
                >
                  View your profile
                </a>
              </>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return {
    publish,
    render,
  };
}
