import { useEffect, useState } from "react";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getPayload } from "../helperFunctions/getPayload";
import ProfileEditDialogue from "./ProfileEditDialogue";

const Profile = () => {
  const [userDetails] = useState(getPayload());
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("tokenDetails") === null) {
      location.replace("/signin");
    }
  }, [navigate]);

  return (
    <>
      {userDetails && userDetails?.userType === "Docter" ? (
        <Paper
          sx={{
            p: 3,
            width: "100%",
            maxWidth: 800,
            margin: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={3}>
              <Avatar
                alt={userDetails?.name}
                src={userDetails?.profileImage}
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography gutterBottom variant="h5">
                {userDetails?.name}
              </Typography>
              <Typography variant="subtitle1">{userDetails?.email}</Typography>
              <Typography variant="body2">
                Specialization: {userDetails?.specialization.join(", ")}
              </Typography>
              <Typography variant="body2">
                Experience: {userDetails?.experience} years
              </Typography>
              <Typography variant="body2">
                Location: {userDetails?.currentLivingCity},{" "}
                {userDetails?.currentLivingState}
              </Typography>
              <Typography variant="body2">
                User Type: {userDetails?.userType}
              </Typography>
            </Grid>
          </Grid>
          <ProfileEditDialogue />
        </Paper>
      ) : (
        userDetails && (
          <>
            <Paper
              sx={{
                p: 3,
                width: "100%",
                maxWidth: 800,
                margin: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4} md={3}>
                  <Avatar
                    alt={userDetails?.name}
                    src={userDetails?.profileImage}
                    sx={{ width: 150, height: 150 }}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography gutterBottom variant="h5">
                    {userDetails?.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    {userDetails?.email}
                  </Typography>
                </Grid>
              </Grid>
              <ProfileEditDialogue />
            </Paper>
          </>
        )
      )}
    </>
  );
};

export default Profile;
