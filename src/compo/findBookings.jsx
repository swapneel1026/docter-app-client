import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getPayload } from "../helperFunctions/getPayload";
import { toast } from "sonner";
import CircleLoader from "./loader";

function FindBookings() {
  const [bookings, setBookings] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [bookingStatus, setBookingStatus] = useState("");
  const [userDetails] = useState(getPayload());
  const [loading, setLoading] = useState(false);

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
  useEffect(() => {
    if (!localStorage.getItem("tokenDetails")) {
      navigate("/signin");
    }
  }, [navigate, userDetails]);

  useEffect(() => {
    FetchBooking();
  }, [bookingStatus]);

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
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                FetchBooking();
              }}
              variant="contained"
              color="success"
            >
              Refresh
              {loading ? <CircleLoader /> : <RefreshIcon />}
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
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                FetchBooking();
              }}
              variant="contained"
            >
              Refresh
              {loading ? <CircleLoader /> : <RefreshIcon />}
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
