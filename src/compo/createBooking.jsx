import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { getPayload } from "../helperFunctions/getPayload";
import { toast } from "sonner";
import CircleLoader from "./loader";

const CreateBooking = () => {
  const [allDocters, setAllDocters] = useState([]);
  const [userDetails] = useState(getPayload());
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const API_URL =
    import.meta.env.VITE_ENV === "production"
      ? import.meta.env.VITE_PROD_BASE_URL
      : import.meta.env.VITE_DEV_BASE_URL;
  const PostBooking = async (data) => {
    try {
      const response = await fetch(`${API_URL}/api/booking/bookappointment`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          previousPrescriptionImage: data.previousPrescriptionImage.name,
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast("Booking Successful!");
        navigate("/dashboard");
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast("Error:", error);
    }
  };

  const FetchAllDocterList = async () => {
    try {
      const response = await fetch(`${API_URL}/api/docter/getalldocter`, {
        mode: "cors",
      });
      const docterList = await response.json();
      setAllDocters(docterList?.data);
    } catch (error) {
      toast(error);
    }
  };

  useEffect(() => {
    if (!userDetails) {
      navigate("/signin");
    }
    if (userDetails?.userType === "Docter") {
      navigate("/dashboard");
    }
    FetchAllDocterList();
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      dateOfBooking: formData.get("date"),
      docter: formData.get("docteroption"),
      bookedBy: formData.get("bookedby"),
      reasonOfBooking: formData.get("reason"),
      previousPrescriptionImage: formData.get("prescriptionImage"),
      patientName: formData.get("patientname"),
      patientAge: formData.get("patientAge"),
      refferedByDocter: formData.get("refferedby"),
    };

    PostBooking(data);
    setLoader(true);
  };

  return (
    <>
      {userDetails && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600">
          <form
            id="formElem"
            onSubmit={(e) => handleBooking(e)}
            className="flex flex-col items-center justify-center w-full px-4 py-8 bg-white rounded-md shadow-xl sm:max-w-md"
          >
            <h1 className="mb-6 text-4xl font-bold text-teal-600">
              Create Booking
            </h1>
            <Box className="flex flex-col w-full gap-2 mb-2">
              <label htmlFor="date" className="font-bold text-gray-700">
                Pick a date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="p-2 border-2 border-teal-600 rounded-md shadow-xl focus:transition-all focus:ring-teal-600 focus:ring-2 focus:outline-none selection:text-red-500"
                required
              />
            </Box>
            <Box className="flex flex-col w-full gap-2 mb-2">
              <label htmlFor="docteroption" className="font-bold text-gray-700">
                Select Docter
              </label>
              <select
                name="docteroption"
                id="docteroption"
                className="p-2 border-2 border-teal-600 rounded-md shadow-xl focus:transition-all focus:ring-teal-600 focus:ring-2 focus:outline-none "
              >
                {allDocters?.map((docter) => (
                  <option key={docter._id} value={docter?._id}>
                    Dr. {docter.name}
                  </option>
                ))}
              </select>
            </Box>

            <Box className="flex flex-col w-full gap-2 mb-2">
              <label htmlFor="bookedby" className="font-bold text-gray-700">
                Booked By
              </label>
              <select
                name="bookedby"
                id="bookedby"
                className="p-2 border-2 border-teal-600 rounded-md shadow-xl focus:transition-all focus:ring-teal-600 focus:ring-2 focus:outline-none "
              >
                <option value={userDetails?.id}>{userDetails?.name}</option>
              </select>
            </Box>
            <Box className="flex flex-col w-full gap-2 mb-2">
              <label htmlFor="reason" className="font-bold text-gray-700">
                Reason for booking
              </label>
              <textarea
                name="reason"
                id="reason"
                rows="3"
                required
                className="p-2 border-2 border-teal-600 rounded-md shadow-xl resize-none focus:transition-all focus:ring-teal-600 focus:ring-2 focus:outline-none selection:text-red-500"
              ></textarea>
            </Box>
            <Box className="flex flex-col w-full gap-2 mb-2">
              <label
                htmlFor="prescriptionImage"
                className="font-bold text-gray-700"
              >
                Prescription Image
              </label>
              <input
                type="file"
                name="prescriptionImage"
                id="prescriptionImage"
                className="px-2 py-1 border-2 border-teal-600 rounded-md shadow-xl resize-none focus:transition-all focus:ring-teal-600 focus:ring-2 focus:outline-none selection:text-red-500"
              />
            </Box>
            <Box className="flex flex-col w-full gap-2 mb-2">
              <label htmlFor="patientname" className="font-bold text-gray-700">
                Patient Name
              </label>
              <input
                type="text"
                required
                name="patientname"
                id="patientname"
                className="p-2 border-2 border-teal-600 rounded-md shadow-xl resize-none focus:transition-all focus:ring-teal-600 focus:ring-2 focus:outline-none selection:text-red-500"
              />
            </Box>
            <Box className="flex flex-col w-full gap-2 mb-2">
              <label htmlFor="patientAge" className="font-bold text-gray-700">
                Patient Age
              </label>
              <input
                type="text"
                required
                name="patientAge"
                id="patientAge"
                className="p-2 border-2 border-teal-600 rounded-md shadow-xl resize-none focus:transition-all focus:ring-teal-600 focus:ring-2 focus:outline-none selection:text-red-500"
              />
            </Box>
            <Box className="flex flex-col w-full gap-2 mb-4">
              <label htmlFor="refferedby" className="font-bold text-gray-700">
                Referred by
              </label>
              <input
                type="text"
                required
                name="refferedby"
                id="refferedby"
                className="p-2 border-2 border-teal-600 rounded-md shadow-xl resize-none focus:ring-teal-600 focus:ring-2 focus:transition-all focus:outline-none selection:text-red-500"
              />
            </Box>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 border rounded-md md:text-lg"
            >
              {loader ? <CircleLoader height={"15"} width={"15"} /> : "BOOK"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateBooking;
