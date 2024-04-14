import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@mui/material";
import { getPayload } from "../helperFunctions/getPayload";
import { useNavigate } from "react-router-dom";
import CircleLoader from "./loader";
import FileUpload from "./FileUpload";
import { toast } from "sonner";

const ProfileEditDialogue = () => {
  const [userDetails] = useState(getPayload());
  const [loader, setLoader] = useState(false);
  const [filename, setFileName] = useState("No file Selected");

  const navigate = useNavigate();
  const API_URL =
    import.meta.env.VITE_ENV === "production"
      ? import.meta.env.VITE_PROD_BASE_URL
      : import.meta.env.VITE_DEV_BASE_URL;

  const PostUpdateProfile = async (data) => {
    try {
      const res = await fetch(
        `${API_URL}/api/${userDetails?.userType.toLowerCase()}/updateprofile`,
        {
          mode: "cors",
          body: data,
          method: "POST",
        }
      );

      const response = await res.json();
      if (response?.success) {
        setLoader(false);
        localStorage.setItem(
          "tokenDetails",
          JSON.stringify({
            loggedin: true,
            token: response?.cookieValue,
          })
        );
        navigate(0);
      } else {
        setLoader(false);
      }
      toast(response?.msg);
    } catch (error) {
      toast(error.code);
      setLoader(false);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setLoader(true);
    const dataForUserProfileUpdate = new FormData(e.target);
    dataForUserProfileUpdate.append(
      `${userDetails?.userType === "User" ? "userId" : "docterId"}`,
      userDetails?.id
    );
    PostUpdateProfile(dataForUserProfileUpdate);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="submit"
          className={`${
            userDetails?.userType === "User"
              ? "bg-teal-600 focus:transition-all focus:ring-teal-600 focus:ring-2"
              : "bg-blue-500 focus:transition-all focus:ring-blue-500 focus:ring-2"
          }  focus:outline-none flex items-center gap-2 px-4 py-2 text-sm font-medium text-white  border rounded-md md:text-lg`}
        >
          EDIT
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <form encType="multipart/form" onSubmit={(e) => handleUpdateProfile(e)}>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none overflow-y-auto">
            <Dialog.Title
              className={`${
                userDetails?.userType === "User"
                  ? "text-teal-600"
                  : "text-blue-500"
              } text-lg font-bold`}
            >
              Edit profile
            </Dialog.Title>
            <Dialog.Description className="mt-4 mb-4 text-sm font-bold text-gray-900">
              Make changes to your profile here. Click save when you're done.
            </Dialog.Description>
            <fieldset className="mb-[15px] flex items-center md:justify-center justify-between gap-3 lg:gap-5">
              <label
                className="font-bold text-left text-gray-500"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={`${
                  userDetails?.userType === "User"
                    ? "focus:transition-all focus:ring-teal-600 focus:ring-2 border-teal-600"
                    : " focus:transition-all focus:ring-blue-500 focus:ring-2 border-blue-500"
                } p-2 border-2 rounded-md shadow-xl focus:transition-all  focus:outline-none w-32 md:w-full `}
                id="name"
                name="name"
                defaultValue={userDetails?.name}
                required
              />
            </fieldset>
            <fieldset className="mb-[15px] md:justify-between justify-between flex items-center gap-3 lg:gap-5 ">
              <label
                className="font-bold text-left text-gray-500"
                htmlFor="profileImage"
              >
                Profile Image
              </label>
              <div className="flex flex-col items-center">
                <FileUpload setFileName={setFileName} />
                <h4 className="text-xs font-medium text-justify">
                  {filename.slice(0, 20)} {filename.length > 20 ? "..." : ""}
                </h4>
              </div>
            </fieldset>

            {userDetails?.userType === "Docter" && (
              <>
                <fieldset className="mb-[15px] flex md:justify-center justify-between items-center gap-3 lg:gap-5">
                  <label
                    className="font-bold text-left text-gray-500"
                    htmlFor="password"
                  >
                    Specialization
                  </label>
                  <input
                    className={`${
                      userDetails?.userType === "User"
                        ? "focus:transition-all focus:ring-teal-600 focus:ring-2 border-teal-600"
                        : " focus:transition-all focus:ring-blue-500 focus:ring-2 border-blue-500"
                    } p-2 border-2 rounded-md shadow-xl focus:transition-all  focus:outline-none w-32 md:w-full `}
                    type="text"
                    id="specialization"
                    name="specialization"
                    defaultValue={userDetails?.specialization}
                    required
                  />
                </fieldset>
                <fieldset className="mb-[15px] flex md:justify-center justify-between items-center gap-3 lg:gap-5">
                  <label
                    className="font-bold text-left text-gray-500"
                    htmlFor="password"
                  >
                    Experience
                  </label>
                  <input
                    className={`${
                      userDetails?.userType === "User"
                        ? "focus:transition-all focus:ring-teal-600 focus:ring-2 border-teal-600"
                        : " focus:transition-all focus:ring-blue-500 focus:ring-2 border-blue-500"
                    } p-2 border-2 rounded-md shadow-xl focus:transition-all  focus:outline-none w-32 md:w-full`}
                    type="text"
                    id="experience"
                    name="experience"
                    defaultValue={userDetails?.experience}
                    required
                  />
                </fieldset>
                <fieldset className="mb-[15px] flex md:justify-center justify-between items-center gap-3 lg:gap-5">
                  <label
                    className="font-bold text-left text-gray-500"
                    htmlFor="password"
                  >
                    City
                  </label>
                  <input
                    className={`${
                      userDetails?.userType === "User"
                        ? "focus:transition-all focus:ring-teal-600 focus:ring-2 border-teal-600"
                        : " focus:transition-all focus:ring-blue-500 focus:ring-2 border-blue-500"
                    } p-2 border-2 rounded-md shadow-xl focus:transition-all  focus:outline-none w-32 md:w-full `}
                    type="text"
                    id="currentLivingCity"
                    name="currentLivingCity"
                    defaultValue={userDetails?.currentLivingCity}
                    required
                  />
                </fieldset>
                <fieldset className="mb-[15px] flex md:justify-center justify-between items-center gap-3 lg:gap-5">
                  <label
                    className="font-bold text-left text-gray-500"
                    htmlFor="password"
                  >
                    State
                  </label>
                  <input
                    className={`${
                      userDetails?.userType === "User"
                        ? "focus:transition-all focus:ring-teal-600 focus:ring-2 border-teal-600"
                        : " focus:transition-all focus:ring-blue-500 focus:ring-2 border-blue-500"
                    } p-2 border-2 rounded-md shadow-xl focus:transition-all  focus:outline-none w-32 md:w-full `}
                    type="text"
                    id="currentLivingState"
                    name="currentLivingState"
                    defaultValue={userDetails?.currentLivingState}
                    required
                  />
                </fieldset>
              </>
            )}
            <small className="text-sm font-bold text-gray-900">
              Enter password to update profile
            </small>
            <fieldset className="mt-2 mb-[15px] flex md:justify-center justify-between items-center gap-3 lg:gap-5">
              <label
                className="font-bold text-left text-gray-500"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`${
                  userDetails?.userType === "User"
                    ? "focus:transition-all focus:ring-teal-600 focus:ring-2 border-teal-600"
                    : " focus:transition-all focus:ring-blue-500 focus:ring-2 border-blue-500"
                } p-2 border-2 rounded-md shadow-xl focus:transition-all  focus:outline-none w-32 md:w-full`}
                type="password"
                id="password"
                name="password"
              />
            </fieldset>

            <div className="mt-[25px] flex justify-end">
              <button
                type="submit"
                className={`${
                  userDetails?.userType === "User"
                    ? "bg-teal-600 focus:ring-teal-600"
                    : "bg-blue-500 focus:ring-blue-500"
                } flex items-center gap-2 px-4 py-2 text-sm font-medium text-white  border rounded-md md:text-lg focus:transition-all  focus:ring-2 focus:outline-none`}
              >
                {loader ? (
                  <CircleLoader height={"15"} width={"15"} />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </form>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProfileEditDialogue;
