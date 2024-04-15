import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import PdfViewer from "./PdfRenderer";

const BookingFullDetailsDialogue = ({ bookingDetails }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="p-2 text-xs text-white bg-blue-500 rounded-md text-nowrap">
        View More
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="scrollbar-hide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none overflow-y-auto overflow-x-hidden">
        <Dialog.Title className="m-0 text-lg font-medium lg:text-xl text-mauve12">
          Full Patient Details
        </Dialog.Title>

        {/* FULL DETAILS OF PATIENT */}
        <div className="mt-[25px] flex flex-col gap-4 py-10  w-full border-2 border-gray-400 rounded-xl">
          <div className="flex justify-between px-4 text-xs md:px-8 md:text-base">
            <label htmlFor="name">Booking Creation Date</label>
            <label>
              {new Date(bookingDetails?.createdAt).toLocaleDateString()}
            </label>
          </div>
          <div className="flex justify-between px-4 text-xs md:px-8 md:text-base">
            <label htmlFor="name">Booking Creation Time</label>
            <label>
              {new Date(bookingDetails?.createdAt).toLocaleTimeString()}
            </label>
          </div>
          <div className="flex justify-between px-4 text-xs md:px-8 md:text-base">
            <label htmlFor="name">Patient Name</label>
            <label className="capitalize">{bookingDetails?.patientName}</label>
          </div>
          <div className="flex justify-between px-4 text-xs md:px-8 md:text-base">
            <label htmlFor="name">Patient Age</label>
            <label>{bookingDetails?.patientAge}</label>
          </div>
          <div className="flex justify-between px-4 text-xs md:px-8 md:text-base">
            <label htmlFor="name">Date of Booking</label>
            <label>
              {new Date(bookingDetails?.dateOfBooking).toLocaleDateString()}
            </label>
          </div>
          <div className="flex justify-between px-4 text-xs md:px-8 md:text-base">
            <label htmlFor="name">Reason for Booking</label>
            <label>{bookingDetails?.reasonOfBooking}</label>
          </div>
          <div className="flex justify-between px-4 text-xs md:px-8 md:text-base">
            <label htmlFor="name">Referred by Docter</label>
            <label>{bookingDetails?.refferedByDocter}</label>
          </div>
          <div className="flex justify-between px-4 text-xs md:px-8 md:text-base">
            <label htmlFor="name">Current Status</label>
            <label>{bookingDetails?.bookingStatus}</label>
          </div>
          <div className="flex justify-between px-4 text-xs md:px-8 md:text-base">
            <label htmlFor="name">Booked by</label>
            <label>{bookingDetails?.bookedBy?.name}</label>
          </div>
          {bookingDetails?.previousPrescriptionImage && (
            <div className="flex flex-col justify-between gap-4 px-4 text-xs md:px-8 md:text-base">
              <label htmlFor="name">Previous Prescription</label>
              <PdfViewer url={bookingDetails?.previousPrescriptionImage} />
            </div>
          )}
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
    </Dialog.Portal>
  </Dialog.Root>
);

export default BookingFullDetailsDialogue;
