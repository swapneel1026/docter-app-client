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
            <Box className="flex flex-col w-full gap-4">
              <label htmlFor="date" className="text-gray-700">
                Pick a date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="input"
                required
              />
            </Box>
            <Box className="flex flex-col w-full gap-4">
              <label htmlFor="docteroption" className="text-gray-700">
                Select Docter
              </label>
              <select name="docteroption" id="docteroption" className="input">
                {allDocters?.map((docter) => (
                  <option key={docter._id} value={docter?._id}>
                    Dr. {docter.name}
                  </option>
                ))}
              </select>
            </Box>

            <Box className="flex flex-col w-full gap-4">
              <label htmlFor="bookedby" className="text-gray-700">
                Booked By
              </label>
              <select name="bookedby" id="bookedby" className="input">
                <option value={userDetails?.id}>{userDetails?.name}</option>
              </select>
            </Box>
            <Box className="flex flex-col w-full gap-4">
              <label htmlFor="reason" className="text-gray-700">
                Reason for booking
              </label>
              <textarea
                name="reason"
                id="reason"
                rows="3"
                required
                className="resize-none input"
              ></textarea>
            </Box>
            <Box className="flex flex-col w-full gap-4">
              <label htmlFor="prescriptionImage" className="text-gray-700">
                Prescription Image
              </label>
              <input
                type="file"
                name="prescriptionImage"
                id="prescriptionImage"
                className="input"
              />
            </Box>
            <Box className="flex flex-col w-full gap-4">
              <label htmlFor="patientname" className="text-gray-700">
                Patient Name
              </label>
              <input
                type="text"
                required
                name="patientname"
                id="patientname"
                className="input"
              />
            </Box>
            <Box className="flex flex-col w-full gap-4">
              <label htmlFor="patientAge" className="text-gray-700">
                Patient Age
              </label>
              <input
                type="text"
                required
                name="patientAge"
                id="patientAge"
                className="input"
              />
            </Box>
            <Box className="flex flex-col w-full gap-4">
              <label htmlFor="refferedby" className="text-gray-700">
                Referred by
              </label>
              <input
                type="text"
                required
                name="refferedby"
                id="refferedby"
                className="input"
              />
            </Box>
            <Button variant="contained" type="submit" color="primary">
              {loader ? <CircleLoader /> : "book"}
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateBooking;
