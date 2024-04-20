import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Pencil2Icon } from "@radix-ui/react-icons";

const EditBookingButton = ({
  handleBookingTimingChange,
  bookingId,
  setNewChangedDate,
  newChangedDate,
}) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <Pencil2Icon role="button" color="red" />
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-bold">
          Edit Timings of Booking
        </AlertDialog.Title>
        <AlertDialog.Description className="text-mauve11 font-medium mt-4 mb-5 text-[15px] leading-normal">
          Once booking is confirmed from Docter's side.Timings cant be modified.
        </AlertDialog.Description>
        <div className="flex justify-between px-8 my-4 mt-8">
          <label htmlFor="changeDate">Select new date</label>
          <input
            type="date"
            name="changeDate"
            id="changeDate"
            onChange={(e) => setNewChangedDate(e.target.value)}
            required
          />
        </div>
        {newChangedDate === "" && (
          <p className="mb-4 text-xs font-medium text-red-800">
            Please select a date to change date
          </p>
        )}
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="text-gray-500 bg-gray-200 hover:bg-gray-300 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] transition-all">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action
            asChild
            onClick={() => handleBookingTimingChange(bookingId)}
          >
            <button
              disabled={newChangedDate === ""}
              className="text-green-500 disabled:text-white disabled:bg-gray-500 disabled:cursor-not-allowed bg-green-100 hover:bg-green-200 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none transition-all focus:shadow-[0_0_0_2px]"
            >
              Yes, Change Timings
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default EditBookingButton;
