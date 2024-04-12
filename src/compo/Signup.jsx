import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CircleLoader from "./loader";

const Signup = () => {
  const [formType, setFormType] = useState("user");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_ENV === "production"
      ? import.meta.env.VITE_PROD_BASE_URL
      : import.meta.env.VITE_DEV_BASE_URL;
  const PostUser = async (data) => {
    try {
      const res = await fetch(`${API_URL}/api/${formType}/signup`, {
        mode: "cors",
        body: data,
        method: "POST",
      });

      const response = await res.json();
      if (response.success) {
        setLoader(false);
        toast("Succesfully signed up!");
        navigate("/signin");
      }
      if (response?.error?.code === 11000) {
        toast("Email already exists!");
      } else if (response?.error) {
        toast(response?.error);
      }
    } catch (error) {
      toast(error.code);
    }
  };

  const handleNewUserSignup = (e) => {
    e.preventDefault();
    const userPayload = new FormData(e.target);
    PostUser(userPayload);
    setLoader(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="flex flex-col items-center justify-center w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-8 text-4xl font-bold text-teal-600">
          SignUp {formType === "user" ? "(User)" : "(Docter)"}
        </h1>
        <div className="flex justify-center mb-4 space-x-4">
          <Button
            variant="contained"
            onClick={() => setFormType("user")}
            className={formType === "user" ? "bg-teal-600" : ""}
          >
            User
          </Button>
          <Button
            variant="contained"
            onClick={() => setFormType("docter")}
            className={formType === "docter" ? "bg-teal-600" : ""}
          >
            Docter
          </Button>
        </div>
        <form
          onSubmit={(e) => handleNewUserSignup(e)}
          className="w-full space-y-4"
          encType="multipart/form"
        >
          <TextField
            required
            type="text"
            name="name"
            label="Full Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            type="email"
            required
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
          />
          <TextField
            type="password"
            required
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
          />
          {formType === "docter" && (
            <>
              <TextField
                type="text"
                required
                name="specialization"
                label="Specialization"
                variant="outlined"
                fullWidth
              />
              <label htmlFor="docsImage">Upload Documents</label>
              <input type="file" name="docsImage" id="docsImage" />
              <TextField
                type="text"
                required
                name="currentLivingState"
                label="Current Living State"
                variant="outlined"
                fullWidth
              />
              <TextField
                type="text"
                required
                name="currentLivingCity"
                label="Current Living City"
                variant="outlined"
                fullWidth
              />
            </>
          )}
          {formType === "docter" && (
            <>
              <TextField
                type="text"
                required
                name="experience"
                label="Experience"
                variant="outlined"
                fullWidth
              />
            </>
          )}
          <label className="mt-2" htmlFor="profileImage">
            Upload Profile Image
          </label>
          <input type="file" name="profileImage" id="profileImage" />
          <Button
            // onClick={() => setLoader(true)}
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
          >
            {loader ? <CircleLoader /> : "Signup"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
