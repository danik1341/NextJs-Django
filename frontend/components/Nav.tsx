import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

const Nav: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const handleToggleDrawer = () => {
    setToggle(!toggle);
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
            </List>
          </div>
        </Drawer>
        <Typography variant="h6" className="flex-grow">
          Local Reviews
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Nav;
