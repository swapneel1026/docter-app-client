import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formType, setFormType] = useState("user");
  const navigate = useNavigate();

  const PostUser = async (data) => {
    console.log(data);
    await fetch(`${import.meta.env.VITE_HOST_NAME}/api/${formType}/signup`, {
      mode: "cors",
      body: data,
      method: "POST",
    })
      .then(async (res) => {
        const response = await res.json();
        if (response.success) navigate("/signin");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleNewUserSignup = (e) => {
    e.preventDefault();
    // const docterPayload = new FormData(e.target);
    const userPayload = new FormData(e.target);
    PostUser(userPayload);
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
          <Button variant="contained" type="submit" color="primary" fullWidth>
            SignUp
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
