import { useEffect, useState } from "react";
import { getUser } from "../helperFunctions/getUser";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";

function FindBookings() {
  const [bookings, setBookings] = useState(null);
  const [userDetails] = useState(getUser());
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [bookingStatus, setBookingStatus] = useState("");
  // console.log(userDetails);

  const FetchBooking = async () => {
    const bookingDetails = await fetch(
      `${import.meta.env.VITE_HOST_NAME}/api/booking/${
        userDetails?.userType === "User"
          ? "findbookinguser"
          : "findbookingdocter"
      }/${userDetails?.id}`,
      {
        mode: "cors",
      }
    ).then((res) => res.json());
    setBookings(bookingDetails);
  };
  const handleStatusChange = async (bookingId, e) => {
    const newStatus = e.target.value;
    // eslint-disable-next-line no-unused-vars
    setBookingStatus((prevStatus) => {
      return newStatus;
    });
    console.log(newStatus, bookingId, "bs");
    try {
      const response = await fetch(`/api/booking/updatestatus/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingStatus: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      console.log("Status updated successfully:", newStatus);
      navigate(0);
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };
  useEffect(() => {
    if (userDetails === null) {
      navigate("/signin");
    }
    FetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, userDetails]);
  return (
    <>
      {/* USER VIEW */}
      {userDetails && userDetails?.userType === "User" && (
        <div className="overflow-x-auto">
          <div className="flex items-center justify-between px-4">
            <h1 className="mb-6 text-6xl font-bold">Booking Details</h1>
            <Button
              className="flex gap-2"
              onClick={() => {
                FetchBooking();
              }}
              variant="contained"
            >
              Refresh
              <RefreshIcon />
            </Button>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-center">Date</th>
                <th className="px-4 py-2 text-center">Created At</th>
                <th className="px-4 py-2 text-center">Doctor</th>
                <th className="px-4 py-2 text-center">Reason</th>
                <th className="px-4 py-2 text-center">Patient Name</th>
                <th className="px-4 py-2 text-center">Patient Age</th>
                <th className="px-4 py-2 text-center">Referred By Doctor</th>
                <th className="px-4 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.data?.map((booking) => (
                <tr key={booking._id} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-center">
                    {new Date(booking.dateOfBooking).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(booking.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {booking.docter.name}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {booking.reasonOfBooking}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {booking.patientName}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {booking.patientAge}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {booking.refferedByDocter}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DOCTER VIEW */}
      {userDetails && userDetails?.userType === "Docter" && (
        <div className="overflow-x-auto">
          <div className="flex items-center justify-between px-4">
            <h1 className="mb-6 text-6xl font-bold">Appointment Details</h1>
            <Button
              className="flex gap-2"
              onClick={() => {
                FetchBooking();
              }}
              variant="contained"
            >
              Refresh
              <RefreshIcon />
            </Button>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-center">Date</th>
                <th className="px-4 py-2 text-center">Created At</th>
                <th className="px-4 py-2 text-center">Reason</th>
                <th className="px-4 py-2 text-center">Patient Name</th>
                <th className="px-4 py-2 text-center">Patient Age</th>
                <th className="px-4 py-2 text-center">Referred By Doctor</th>
                <th className="px-4 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.data?.map((booking) => (
                <tr key={booking._id} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-center">
                    {new Date(booking.dateOfBooking).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(booking.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {booking.reasonOfBooking}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {booking.patientName}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {booking.patientAge}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {booking.refferedByDocter}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
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
