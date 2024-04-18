import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getPayload } from "../helperFunctions/getPayload";
import { toast } from "sonner";
import CircleLoader from "./loader";
import BookingFullDetailsDialogue from "./BookingFullDetailsDialogue";
import DeleteBookingButton from "./DeleteBookingButton";
import EditBookingButton from "./EditBookingButton";
import { Pencil2Icon } from "@radix-ui/react-icons";
import TooltipBox from "./ToolTip";

function FindBookings() {
  const [bookings, setBookings] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [bookingStatus, setBookingStatus] = useState("");
  const [userDetails] = useState(getPayload());
  const [loading, setLoading] = useState(false);
  const [newChangedDate, setNewChangedDate] = useState("");
  console.log(newChangedDate);

  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_ENV === "production"
      ? import.meta.env.VITE_PROD_BASE_URL
      : import.meta.env.VITE_DEV_BASE_URL;

  const FetchBooking = async () => {
    const res = await fetch(
      `${API_URL}/api/booking/${
        userDetails?.userType === "User"
          ? "findbookinguser"
          : "findbookingdocter"
      }/${userDetails?.id}`,
      {
        mode: "cors",
      }
    );
    const bookingDetails = await res.json();
    setBookings(bookingDetails);
  };

  const handleStatusChange = async (bookingId, e) => {
    const newStatus = e.target.value;
    // eslint-disable-next-line no-unused-vars
    setBookingStatus((prevStatus) => {
      return newStatus;
    });
    try {
      const response = await fetch(
        `${API_URL}/api/booking/updatestatus/${bookingId}`,
        {
          mode: "cors",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ bookingStatus: newStatus }),
        }
      );
      if (!response.ok) {
        toast("Failed to update status");
      }
      toast("Status updated successfully to " + newStatus);
      FetchBooking();
    } catch (error) {
      toast("Error updating status:", error.message);
    }
  };

  const handleBookingDelete = async (bookingId) => {
    try {
      const res = await fetch(`${API_URL}/api/booking/deletebooking`, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId: bookingId }),
      });
      const deletedResponse = await res.json();
      console.log(deletedResponse);
      if (deletedResponse?.success) {
        toast(deletedResponse?.msg);
        navigate(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookingTimingChange = async (bookingId) => {
    try {
      const res = await fetch(
        `${API_URL}/api/booking/updatetiming/${bookingId}`,
        {
          mode: "cors",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dateOfBooking: newChangedDate }),
          credentials: "include",
        }
      );
      const response = await res.json();
      if (response?.success) {
        toast(response.msg);
        navigate(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("tokenDetails")) {
      navigate("/signin");
    }
  }, [navigate, userDetails]);

  useEffect(() => {
    FetchBooking();
  }, [bookingStatus]);
  useEffect(() => {
    window.addEventListener("focus", () => {
      FetchBooking();
    });
  }, []);

  return (
    <>
      {/* USER VIEW */}
      {userDetails && userDetails?.userType === "User" && (
        <div className="overflow-x-auto">
          <div className="flex items-center justify-between px-4 mt-4 mb-6 ">
            <h1 className="text-2xl font-bold md:text-6xl">Booking Details</h1>
            <button
              className="flex items-center gap-2 p-2 text-xs font-medium text-white bg-teal-600 border rounded-md md:text-lg"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                FetchBooking();
              }}
            >
              Refresh
              {loading ? (
                <CircleLoader height={"15"} width={"15"} />
              ) : (
                <RefreshIcon fontSize="15" className="text-[15px] md:text-xl" />
              )}
            </button>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-0 py-2 text-sm text-center lg:text-lg lg:px-4">
                  Date
                </th>
                <th className="px-0 py-2 text-sm text-center lg:text-lg lg:px-4">
                  Doctor
                </th>
                <th className="px-0 py-2 text-sm text-center lg:text-lg lg:px-4">
                  Reason
                </th>
                <th className="px-0 py-2 text-sm text-center lg:text-lg lg:px-4">
                  Patient Name
                </th>
                <th className="px-0 py-2 text-sm text-center lg:text-lg lg:px-4">
                  Status
                </th>
                <th className="px-0 py-2 text-sm text-center lg:text-lg lg:px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings?.data?.map((booking) => (
                <tr key={booking?._id} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-center">
                    {new Date(booking?.dateOfBooking).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-2 text-center capitalize">
                    {booking?.docter?.name}
                  </td>
                  <td className="px-4 py-2 text-center capitalize">
                    {booking?.reasonOfBooking}
                  </td>
                  <td className="px-4 py-2 text-center capitalize">
                    {booking?.patientName}
                  </td>
                  <td
                    className={`${
                      booking.bookingStatus === "Confirmed"
                        ? "text-green-600 bg-green-300"
                        : booking.bookingStatus === "Pending"
                        ? "text-yellow-600 bg-yellow-200"
                        : "text-red-500 bg-red-300"
                    } px-4 py-2 text-center`}
                  >
                    {booking.bookingStatus}
                  </td>
                  <td className="flex items-center justify-center gap-3 px-4 py-2">
                    <BookingFullDetailsDialogue
                      bookingDetails={booking}
                      userDetails={userDetails}
                    />
                    <DeleteBookingButton
                      handleBookingDelete={handleBookingDelete}
                      bookingId={booking?._id}
                    />
                    {booking.bookingStatus === "Confirmed" ? (
                      <>
                        <TooltipBox />
                      </>
                    ) : (
                      <EditBookingButton
                        handleBookingTimingChange={handleBookingTimingChange}
                        bookingId={booking?._id}
                        setNewChangedDate={setNewChangedDate}
                        newChangedDate={newChangedDate}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DOCTER VIEW */}
      {userDetails && userDetails?.userType === "Docter" && (
        <div className="overflow-x-auto">
          <div className="flex items-center justify-between px-4 mt-4 mb-6 ">
            <h1 className="text-2xl font-bold md:text-6xl">
              Appointment Details
            </h1>
            <button
              className="flex items-center gap-2 p-2 text-xs font-medium text-white bg-blue-500 border rounded-md md:text-lg"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                FetchBooking();
              }}
            >
              Refresh
              {loading ? (
                <CircleLoader height={"15"} width={"15"} />
              ) : (
                <RefreshIcon fontSize="15" className="text-[15px] md:text-xl" />
              )}
            </button>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-0 py-2 text-sm text-center lg:text-lg lg:px-4">
                  Date
                </th>
                <th className="px-0 py-2 text-sm text-center lg:text-lg lg:px-4">
                  Reason
                </th>
                <th className="px-4 py-2 text-sm text-center lg:text-lg lg:px-4">
                  Patient Name
                </th>
                <th className="px-0 py-2 text-sm text-center lg:text-lg lg:px-4">
                  Status
                </th>
                <th className="px-0 py-2 text-sm text-center lg:text-lg lg:px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings?.data?.map((booking) => (
                <tr key={booking?._id} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-center">
                    {new Date(booking?.dateOfBooking).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center capitalize">
                    {booking?.reasonOfBooking}
                  </td>
                  <td className="px-4 py-2 text-center capitalize">
                    {booking?.patientName}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <FormControl fullWidth variant="standard">
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={booking?.bookingStatus}
                        label="Age"
                        onChange={(e) => handleStatusChange(booking?._id, e)}
                      >
                        <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
                        <MenuItem value={"Pending"}>Pending</MenuItem>
                        <MenuItem value={"Rejected"}>Rejected</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <BookingFullDetailsDialogue
                      bookingDetails={booking}
                      userDetails={userDetails}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default FindBookings;
