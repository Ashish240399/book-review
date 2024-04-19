"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setUser } from "@/redux/slices/userSlice";
import { logout } from "@/services/auth/logout";

const drawerWidth = 240;
const navItems = ["Home", "Login"];
async function logoutFn(token: string) {
  const response = await logout(token);
  return response;
}
export default function DrawerAppBar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  let userDataFromLocalStorage;
  let userDataFromLocalStorageObj: any;

  if (typeof window !== "undefined") {
    userDataFromLocalStorage = localStorage.getItem("user-book-review-app");
    userDataFromLocalStorageObj = userDataFromLocalStorage
      ? JSON.parse(userDataFromLocalStorage)
      : null;
  }

  const router = useRouter();
  const userDetailsFromRedux = useAppSelector((state) => state.user.user);

  React.useEffect(() => {
    if (userDataFromLocalStorageObj && !userDetailsFromRedux) {
      dispatch(setUser(userDataFromLocalStorageObj));
    }
  }, [userDetailsFromRedux, userDataFromLocalStorageObj]);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BOOK REVIEW
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              onClick={async () => {
                if (item == "Home") {
                  router.push("/home");
                } else if (item == "Login" && !user) {
                  router.push("/login");
                } else if (item == "Login" && user) {
                  const res: any = await logoutFn(user.token);
                  if (res.status == 200) {
                    localStorage.removeItem("user-book-review-app");
                    window.location.reload();
                  }
                }
              }}
              sx={{ textAlign: "center" }}
            >
              <ListItemText
                primary={item == "Login" && user ? "Logout" : item}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            BOOK REVIEW
          </Typography>
          {user && (
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Welcome! {user.name.split(" ")[0]}
            </Typography>
          )}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                onClick={async () => {
                  if (item == "Home") {
                    router.push("/home");
                  } else if (item == "Login" && !user) {
                    router.push("/login");
                  } else if (item == "Login" && user) {
                    const res: any = await logoutFn(user.token);
                    if (res.status == 200) {
                      localStorage.removeItem("user-book-review-app");
                      window.location.reload();
                    }
                  }
                }}
                key={item}
                sx={{ color: "#fff" }}
              >
                {item == "Login" && user ? "Logout" : item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
