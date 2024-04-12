import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { getPayload } from "../helperFunctions/getPayload";
import Cookies from "js-cookie";

function Navbar() {
  const [userDetails] = useState(getPayload());
  const pages = [
    {
      page: "Create Booking",
      Pagepath: "/createbooking",
      signinView: true,
      createBookingView: userDetails?.userType === "Docter" ? false : true,
    },
    {
      page: "My Bookings",
      Pagepath: "/dashboard",
      signinView: true,
      createBookingView: true,
    },
    {
      page: "Sign-In",
      Pagepath: "/signin",
      signinView: userDetails?.name ? false : true,
      createBookingView: true,
    },
    {
      page: "Sign-up",
      Pagepath: "/signup",
      signinView: true,
      createBookingView: true,
    },
  ];
  const settings = [
    {
      setting: "Profile",
      path: "/profile",
    },
    {
      setting: "Logout",
      action: () => {
        localStorage.removeItem("tokenDetails");
        location.replace("/signin");
        Cookies.remove("token", {
          secure: true,
          sameSite: "none",
          path: "/",
          domain: "localhost",
          expires: 12000000,
        });
      },
    },
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElMenu, setAnchorElMenu] = useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{
          display: {
            backgroundColor:
              userDetails?.userType === "Docter" ? "#0D9488" : "#1976D2",
          },
        }}
      >
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BOOKDOCTER
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(
              (page) =>
                page.signinView &&
                page.createBookingView && (
                  <Button
                    key={page.page}
                    sx={{ my: 2, color: "white", display: "block" }}
                    href={page.Pagepath}
                  >
                    {page.page}
                  </Button>
                )
            )}
          </Box>

          {userDetails && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={`${userDetails?.userType}-${userDetails?.name}`}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userDetails?.name}
                    src={userDetails?.profileImage}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.setting} onClick={handleCloseUserMenu}>
                    <Button
                      href={setting.path}
                      onClick={setting.action}
                      textAlign="center"
                    >
                      {setting.setting}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
      <Menu
        anchorEl={anchorElMenu}
        open={Boolean(anchorElMenu)}
        onClose={handleCloseMenu}
      >
        {pages.map(
          (page) =>
            page.signinView &&
            page.createBookingView && (
              <MenuItem key={page.page} onClick={handleCloseMenu}>
                <Button href={page.Pagepath}>{page.page}</Button>
              </MenuItem>
            )
        )}
      </Menu>
    </AppBar>
  );
}
export default Navbar;
