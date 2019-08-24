import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import TabPanel from "./tabpanel";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";

const axios = require("axios");

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    background: "black",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [test, setTest] = React.useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.themoviedb.org/3/list/1?api_key=d08e306ec9e6515e766d7314e68505ec&language=en-US"
      );
      let data = await response.json();

      setData(data.items);
    }
    fetchData();
  });

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function selectMovie(m) {
    console.log(m);

    axios
      .post(`http://localhost:5000/users/addMovie/${currentUser._id}`, m)
      .then(response => {
        // handle success
        console.log(response);
        setTest(m);
        // handleClose();
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }
  function generate() {
    if (data !== undefined) {
      return data.map(value => (
        <>
          <ListItem key={value.id}>
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={`https://image.tmdb.org/t/p/w500/${value.backdrop_path}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={value.title}
              secondary={secondary ? "Secondary text" : null}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="add"
                onClick={() => {
                  selectMovie(value);
                }}
              >
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider></Divider>
        </>
      ));
    }
  }

  const drawer = (
    <div>
      <div className={classes.demo}>
        <List dense={dense}>
          {data.length === 0
            ? "No data from themoviedb, it happens some times, please reload "
            : generate()}
        </List>
      </div>
    </div>
  );
  function getCurrentUser(user) {
    console.log("from drawer");
    setCurrentUser(user);
    console.log(user);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Favourite movies{" "}
          </Typography>
        </Toolbar>
      </AppBar>
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
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Paper>
          {" "}
          <TabPanel
            test={test}
            setCurrentUser={user => {
              getCurrentUser(user);
            }}
          />
        </Paper>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

export default ResponsiveDrawer;
