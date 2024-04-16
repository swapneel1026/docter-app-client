import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setCookieToLocalStorage } from "../helperFunctions/setToken";
import { toast } from "sonner";
import CircleLoader from "./loader";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeofUser, settypeofUser] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
          const cookieRes = await setCookieToLocalStorage();
          const data = cookieRes;
          setLoader(false);
          if (data) {
            toast("Welcome to BookDocter");
            location.replace("/dashboard");
          }
        }
      } else {
        const response = await res.json();
        toast(response.msg);
        setLoader(false);
      }
    } catch (error) {
      toast(error);
    }
  };

  const handleUserSignin = (e) => {
    e.preventDefault();
    GetUser();
    setLoader(true);
  };

  useEffect(() => {
    const tokenDetails = localStorage.getItem("tokenDetails");
    if (tokenDetails) {
      location.replace("/dashboard");
    }
  }, [navigate]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen  from-gray-900 to-gray-400 bg-gradient-to-b
    `}
    >
      <form
        onSubmit={(e) => handleUserSignin(e)}
        className="flex flex-col items-stretch justify-center px-10 py-4 rounded-md shadow-xl bg-slate-200 gap-y-4"
      >
        <h1 className="mb-10 text-6xl font-bold text-center text-teal-600">
          Singin
        </h1>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Signin As</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeofUser}
            label="Age"
            onChange={(e) => settypeofUser(e.target.value)}
            defaultValue="User"
            required
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
        <div className="flex items-center justify-center">
          <TextField
            type={showPassword ? "text" : "password"}
            required
            name="password"
            label="Password"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </span>
        </div>
        <Button variant="contained" type="submit" color="inherit">
          {loader ? <CircleLoader height={"15"} width={"15"} /> : "Signin"}
        </Button>
      </form>
    </div>
  );
};

export default Signin;
