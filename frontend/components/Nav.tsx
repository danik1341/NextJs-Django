import React, { useContext, useState } from "react";
import {
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/utils/AuthContext";

const Nav: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const { user, logout } = useContext(AuthContext);

  const handleToggleDrawer = () => {
    setToggle(!toggle);
  };

  const handleLogOut = () => {
    logout();
    // router.push("/account/login");
  };
  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between items-center px-4">
        <IconButton
          edge="start"
          className="mr-2"
          color="inherit"
          aria-label="menu"
          onClick={handleToggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor={"left"} open={toggle} onClose={handleToggleDrawer}>
          <div className=" min-w-[200px]">
            <List>
              <ListItemButton onClick={() => router.push("/")}>
                <ListItemIcon className=" hover:text-black">
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>

              {user ? (
                <ListItemButton onClick={handleLogOut}>
                  <ListItemIcon className=" hover:text-black">
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign Out" />
                </ListItemButton>
              ) : (
                <>
                  <ListItemButton onClick={() => router.push("/account/login")}>
                    <ListItemIcon className=" hover:text-black">
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign In" />
                  </ListItemButton>

                  <ListItemButton
                    onClick={() => router.push("/account/register")}
                  >
                    <ListItemIcon className=" hover:text-black">
                      <BorderColorIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Up" />
                  </ListItemButton>
                </>
              )}
            </List>
          </div>
        </Drawer>
        <Typography variant="h6" className="flex-grow">
          Local Reviews
        </Typography>
        {user && (
          <Typography variant="h6" className="">
            {user.username}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Nav;
