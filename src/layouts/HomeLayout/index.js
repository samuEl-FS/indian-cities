import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const navs = {
  ALL: "ALL",
  SHORLISTED: "SHORLISTED"
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      color: "#fff",
      width: drawerWidth,
      flexShrink: 0,
      boxShadow: `"0 10px 30px -12px rgba(0, 0, 0, 0.42)", "0 4px 25px 0px rgba(0, 0, 0, 0.12)", "0 8px 10px -5px rgba(0, 0, 0, 0.2)"`
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  overlay: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "block",
    zIndex: 1,
    position: "absolute",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundImage: `url(/static/images/sidebar.jpg)`,
    "&::after": {
      width: " 100%",
      height: " 100%",
      content: '""',
      display: "block",
      opacity: 0.8,
      Index: 3,
      position: "absolute",
      background: "#000"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    color: "#fff",
    width: drawerWidth,
    boxShadow: `0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)`
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  drawerContent: {
    height: "100%",
    zIndex: 999
  },
  logoContainer: {
    width: "30px",
    display: "inline-block",
    maxHeight: "30px",
    marginLeft: "10px",
    marginRight: "15px"
  },
  logo: {
    top: "10px",
    width: "35px",
    border: 0,
    position: "absolute",
    verticalAlign: "middle"
  },
  title: {
    padding: "15px 15px",
    zIndex: 4,
    fontSize: "18px",
    fontWeight: "400",
    position: "relative",
    "&::after": {
      right: "15px",
      width: "calc(100% - 30px)",
      bottom: 0,
      height: "1px",
      content: '""',
      position: "absolute",
      backgroundColor: "rgba(180, 180, 180, 0.3)"
    }
  },
  listItemMr: {
    marginTop: "10px",
    marginLeft: "10px",
    marginRight: "10px"
  },
  listItem: {
    borderRadius: "4px",
    "&:hover": {
      boxShadow: `0 12px 20px -10px rgba(0, 172, 193,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(0, 172, 193,.2)`,
      backgroundColor: "#00acc1"
    }
  },
  active: {
    boxShadow: `0 12px 20px -10px rgba(0, 172, 193,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(0, 172, 193,.2)`,
    backgroundColor: "#00acc1"
  }
}));

function DashboardLayout(props) {
  const { window, children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [currentNav, setCurrentNav] = useState();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavChanges = navType => setCurrentNav(navType);

  const drawer = (
    <div className={classes.drawerContent}>
      <div className={classes.title}>
        <div className={classes.logoContainer}>
          <img src="/logo192.png" alt="logo" className={classes.logo} />
        </div>
        Indian Cities
      </div>
      <List>
        <RouterLink
          to="/all"
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className={classes.listItemMr}>
            <ListItem
              className={clsx(
                classes.listItem,
                currentNav === navs.ALL && classes.active
              )}
              button
              key="All"
              onClick={() => {
                handleNavChanges(navs.ALL);
              }}
            >
              <ListItemIcon>
                <DashboardIcon style={{ color: "#fff" }} />
              </ListItemIcon>{" "}
              <ListItemText primary="All" />
            </ListItem>
          </div>
        </RouterLink>

        <RouterLink
          to="/shortlisted"
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className={classes.listItemMr}>
            <ListItem
              className={clsx(
                classes.listItem,
                currentNav === navs.SHORLISTED && classes.active
              )}
              button
              key="Shortlisted"
              onClick={() => {
                handleNavChanges(navs.SHORLISTED);
              }}
            >
              <ListItemIcon>
                <AssignmentReturnedIcon style={{ color: "#fff" }} />
              </ListItemIcon>{" "}
              <ListItemText primary="Shortlisted" />
            </ListItem>
          </div>
        </RouterLink>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    const {
      location: { pathname }
    } = props;

    if (pathname.replace("/", "").toLowerCase() === "all") {
      setCurrentNav(navs.ALL);
    } else if (pathname.replace("/", "").toLowerCase() === "shortlisted") {
      setCurrentNav(navs.SHORLISTED);
    }
  }, [props]);

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
            <div className={classes.overlay}></div>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
            <div className={classes.overlay}></div>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{children}</main>
    </div>
  );
}

DashboardLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default DashboardLayout;
