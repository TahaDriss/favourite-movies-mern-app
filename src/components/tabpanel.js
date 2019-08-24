import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Modal from "./modal";
import Card from "./card-film";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const axios = require("axios");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,

    backgroundColor: theme.palette.background.paper
  }
}));

export default function TabsWrappedLabel(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const [cuser, setCuser] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    if (props.test !== null) {
      for (var i in users) {
        if (users[i]._id === cuser._id) {
          users[i].movies.push(props.test);
          break; //Stop this loop, we found it!
        }
      }
    } else {
      getUsers();
    }
  }, [props.test]);
  const setCurrentUser = v => {
    setCuser(v);
    props.setCurrentUser(v);
  };
  const getUsers = () => {
    axios
      .get("http://localhost:5000/users")
      .then(response => {
        // handle success
        console.log(response.data);
        setValue(response.data[0]._id);
        setCuser(response.data[0]);
        props.setCurrentUser(response.data[0]);
        setUsers(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  };

  function getTabs() {
    let tabs = users.map(v => (
      <Tab
        onClick={() => {
          setCurrentUser(v);
        }}
        value={v._id}
        key={v._id}
        label={v.name}
        wrapped
        {...a11yProps(v._id)}
      />
    ));
    return tabs;
  }
  function getCards(user) {
    return user.movies.map(v => (
      <Grid item xs={6}>
        <Card
          key={v._id}
          film={v}
          user={user}
          refresh={() => {
            getUsers();
          }}
        />
      </Grid>
    ));
  }
  function getTabPanels() {
    let panels = users.map(v => (
      <TabPanel key={v._id} value={value} index={v._id}>
        <h2>{`${v.name.toUpperCase()}'s favourite movies`}</h2>
        <Container>
          <Grid container spacing={3}>
            {v.movies.length === 0 ? (
              <h3>No movies, you can add from the liste on the left</h3>
            ) : (
              getCards(v)
            )}
          </Grid>
        </Container>
      </TabPanel>
    ));
    return panels;
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  /**test */
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "black" }}>
        <Toolbar>
          {users.length === 0 ? (
            <h2 style={{ backgrounds: "white" }}>
              No users, click on the add button
            </h2>
          ) : (
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {getTabs()}
            </Tabs>
          )}

          <Modal
            refresh={() => {
              getUsers();
            }}
          />
        </Toolbar>
      </AppBar>

      {getTabPanels()}
    </div>
  );
}
