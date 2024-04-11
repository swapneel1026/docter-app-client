import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUser } from "../helperFunctions/getUser";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeofUser, settypeofUser] = useState("");
  const userDetails = getUser();
  const navigate = useNavigate();

  const GetUser = async () => {
    await fetch(`/api/${typeofUser}/signin`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      method: "POST",
    })
      .then(async (res) => {
        if (res.headers.has("Set-Cookie")) {
          const cookie = res.headers.getSetCookie("Set-Cookie");
          document.cookie = cookie;
        }
        const response = await res.json();
        if (response.success) {
          // navigate(0);
          // navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleUserSignin = (e) => {
    e.preventDefault();
    GetUser();
  };
  useEffect(() => {
    if (userDetails !== null) {
      navigate("/dashboard");
    }
  }, []);

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
