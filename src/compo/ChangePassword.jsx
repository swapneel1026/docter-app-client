import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { getPayload } from "../helperFunctions/getPayload";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ blur, setBlur }) => {
  const [userDetails] = useState(getPayload());
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_ENV === "production"
      ? import.meta.env.VITE_PROD_BASE_URL
      : import.meta.env.VITE_DEV_BASE_URL;

  const updatePassword = async (data) => {
    try {
      const res = await fetch(
        `${API_URL}/api/${userDetails?.userType.toLowerCase()}/updatepassword`,
        {
          mode: "cors",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: data?.get("password"),
            newPassword: data?.get("newPassword"),
            Id:
              userDetails?.userType === "Docter"
                ? data.get("docterId")
                : data.get("userId"),
          }),
        }
      );
      const passwordChangedResponse = await res.json();
      if (passwordChangedResponse?.success) {
        toast(passwordChangedResponse?.msg);
        navigate(0);
      } else {
        toast(passwordChangedResponse?.msg);
      }
    } catch (error) {
      console.log(error);
      toast(error);
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const docterFormData = new FormData(e.target);
    docterFormData.append(
      `${userDetails?.userType === "Docter" ? "docterId" : "userId"}`,
      userDetails?.id
    );
    updatePassword(docterFormData);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild onClick={() => setBlur(true)}>
        <input
          type="button"
          value="Change Password"
          className={`${
            userDetails?.userType === "User"
              ? "bg-teal-600 focus:transition-all focus:ring-teal-600 focus:ring-2"
              : "bg-blue-500 focus:transition-all focus:ring-blue-500 focus:ring-2"
          } flex focus:outline-none  items-center gap-2 px-2 py-2 text-sm  font-medium text-white text-nowrap  border rounded-md md:text-lg`}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          onPointerDownOutside={() => setBlur(false)}
          onEscapeKeyDown={() => setBlur(false)}
          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <Dialog.Title
            className={`${
              userDetails?.userType === "User"
                ? "text-teal-600"
                : "text-blue-500"
            } text-lg font-bold`}
          >
            Change Password
          </Dialog.Title>
          <Dialog.Description className="mt-4 mb-4 text-sm font-bold text-gray-900">
            Make changes to your password here. Click save when you're done.
          </Dialog.Description>
          <form onSubmit={(e) => handleUpdate(e)}>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="font-bold text-left text-gray-500"
                htmlFor="password"
              >
                Old Password
              </label>
              <input
                required
                type="password"
                className={`${
                  userDetails?.userType === "User"
                    ? "focus:transition-all focus:ring-teal-600 focus:ring-2 border-teal-600"
                    : " focus:transition-all focus:ring-blue-500 focus:ring-2 border-blue-500"
                } p-2 border-2 rounded-md shadow-xl focus:transition-all  focus:outline-none w-32 md:w-full `}
                id="password"
                name="password"
              />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="font-bold text-left text-gray-500"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                required
                type="password"
                className={`${
                  userDetails?.userType === "User"
                    ? "focus:transition-all focus:ring-teal-600 focus:ring-2 border-teal-600"
                    : " focus:transition-all focus:ring-blue-500 focus:ring-2 border-blue-500"
                } p-2 border-2 rounded-md shadow-xl focus:transition-all  focus:outline-none w-32 md:w-full `}
                id="newPassword"
                name="newPassword"
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
                  "Change Password"
                )}
              </button>
            </div>
          </form>
          <Dialog.Close asChild onClick={() => setBlur(false)}>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChangePassword;
