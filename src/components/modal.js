import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";
const axios = require("axios");

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: "50rem",
    height: "22rem",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleChangeName = event => setName(event.target.value);
  const handleChangeEmail = event => setEmail(event.target.value);
  function addUser() {
    if (name !== "" && email !== "") {
      const user = { name, email, movies: [] };
      console.log(user);
      axios
        .post("http://localhost:5000/users/register", user)
        .then(response => {
          // handle success
          console.log(response);
          props.refresh();
          setName("");
          setEmail("");
          handleClose();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          alert("ERROR ! The email must be unique ");
        })
        .finally(function() {
          // always executed
        });
    }
    console.log(name);
    console.log(email);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={handleOpen}
      >
        <AddIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add user</h2>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              name="name"
              label="Name"
              id="name"
              value={name}
              onChange={handleChangeName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleChangeEmail}
            />
            <Button
              style={{ marginTop: "1rem", background: "black", color: "white" }}
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => {
                addUser();
              }}
            >
              Add user
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
