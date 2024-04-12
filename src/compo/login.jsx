import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setCookieToLocalStorage } from "../helperFunctions/setToken";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeofUser, settypeofUser] = useState("");

  const navigate = useNavigate();

  const GetUser = async () => {
    const API_URL =
      import.meta.env.VITE_ENV === "production"
        ? import.meta.env.VITE_PROD_BASE_URL
        : import.meta.env.VITE_DEV_BASE_URL;
    try {
      const res = await fetch(`${API_URL}/api/${typeofUser}/signin`, {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",

        body: JSON.stringify({ email, password }),
        method: "POST",
      });
      if (res.ok) {
        const response = await res.json();
        if (response?.success) {
          setCookieToLocalStorage();
        }
        location.replace("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUserSignin = (e) => {
    e.preventDefault();
    GetUser();
  };

  useEffect(() => {
    const tokenDetails = localStorage.getItem("tokenDetails");
    if (tokenDetails) {
      location.replace("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-600 border border-black">
      <form
        onSubmit={(e) => handleUserSignin(e)}
        className="flex flex-col items-center justify-center px-10 py-4 bg-white rounded-md shadow-xl gap-y-4"
      >
        <h1 className="mb-10 text-6xl font-bold text-teal-600">Singin</h1>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Signin As</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeofUser}
            label="Age"
            onChange={(e) => settypeofUser(e.target.value)}
            defaultValue="User"
          >
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"docter"}>Docter</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="email"
          required
          name="email"
          label="Email"
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          required
          name="password"
          label="Password"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" type="submit" color="inherit">
          SignIn
        </Button>
      </form>
    </div>
  );
};

export default Signin;
