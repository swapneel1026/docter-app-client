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
import { useEffect, useState } from "react";
import { getPayload } from "../helperFunctions/getPayload";
import Cookies from "js-cookie";
import { Badge } from "@mui/material";
import { NotificationsActive } from "@mui/icons-material";
import { useNotifications } from "../hooks/useNotificationContext";
import moment from "moment";

function Navbar() {
  const [userDetails] = useState(getPayload());
  const { notifications, setNotifications } = useNotifications();

  const pages = [
    {
      page: "Home",
      Pagepath: "/",
      signinView: true,
      createBookingView: true,
    },
    {
      page: "Create Booking",
      Pagepath: "/createbooking",
      signinView: userDetails?.userType === "User" ? true : false,
      createBookingView: true,
    },
    {
      page: "My Bookings",
      Pagepath: "/dashboard",
      signinView: userDetails ? true : false,
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
      createBookingView: userDetails ? false : true,
    },
  ];
  const settings = [
    {
      setting: "Profiles",
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
          expires: 12000000000000,
        });
      },
    },
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleOpenNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };
  const handleCloseNotification = () => {
    setAnchorElNotification(null);
    setNotifications([]);
  };

  return (
    <AppBar
      position="static"
      sx={{
        display: {
          backgroundColor:
            userDetails?.userType === "Docter" ? "#1976D2" : "#0D9488",
        },
      }}
    >
      <Container
        maxWidth="2xl"
        sx={{
          display: {
            backgroundColor:
              userDetails?.userType === "Docter" ? "#1976D2" : "#0D9488",
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

          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          />
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

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
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
          {userDetails?.userType === "User" && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={`Notifications`}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={handleOpenNotification}
                  sx={{ pr: 5 }}
                >
                  <Badge badgeContent={notifications?.length} color="error">
                    <NotificationsActive />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", mr: "15px" }}
                anchorEl={anchorElNotification}
                id="notifications"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNotification)}
                onClose={handleCloseNotification}
              >
                <MenuItem
                  onClick={handleCloseNotification}
                  className="flex flex-col gap-2 "
                >
                  {" "}
                  {notifications?.length === 0 && (
                    <p className="px-3 py-2 text-xs font-semibold border border-gray-300 rounded-lg text-slate-800 bg-slate-300">
                      No new notifications
                    </p>
                  )}
                  {notifications?.map(
                    (
                      {
                        previousBookingStatus,
                        newBookingStatus,
                        docter,
                        bookingDate,
                      },
                      i
                    ) => {
                      return (
                        <p
                          key={i}
                          className="px-3 py-2 text-[7px] md:text-xs text-wrap font-semibold border border-gray-300 rounded-lg text-slate-800 bg-slate-300"
                        >{`Status changed from ${previousBookingStatus} to ${newBookingStatus} by Dr.${docter} for ${moment(
                          bookingDate
                        ).format("Do MMM YY")}`}</p>
                      );
                    }
                  )}
                </MenuItem>
              </Menu>
            </Box>
          )}

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
                    <Button href={setting.path} onClick={setting.action}>
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
