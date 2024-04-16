import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const DeleteBookingButton = ({ handleBookingDelete, bookingId }) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button>🗑️</button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-bold">
          Are you absolutely sure?
        </AlertDialog.Title>
        <AlertDialog.Description className="text-mauve11 font-medium mt-4 mb-5 text-[15px] leading-normal">
          This action cannot be undone. This will permanently delete your
          booking and remove your data from our servers.
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="text-gray-500 bg-gray-200 hover:bg-gray-300 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] transition-all">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action
            asChild
            onClick={() => handleBookingDelete(bookingId)}
          >
            <button className="text-red-500 bg-red-100 hover:bg-red-200 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none transition-all focus:shadow-[0_0_0_2px]">
              Yes, delete account
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default DeleteBookingButton;
