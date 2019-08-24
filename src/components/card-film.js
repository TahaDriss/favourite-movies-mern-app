import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { grey } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import ShareLink from "react-twitter-share-link";
import ShareIcon from "@material-ui/icons/Share";
const axios = require("axios");

const useStyles = makeStyles(theme => ({
  card: {
    width: 330,

    margin: 12
  },
  media: {
    height: 0,
    paddingTop: "100%" // 16:9
  },

  avatar: {
    backgroundColor: grey[700]
  }
}));

export default function RecipeReviewCard(props) {
  function deletemovie() {
    axios
      .post(
        `http://localhost:5000/users/deleteMovie/${props.user._id}`,
        props.film
      )
      .then(response => {
        // handle success
        console.log(response);
        props.refresh();
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }
  const classes = useStyles();
  const title =
    new Date(props.film.release_date).getFullYear() ===
    new Date().getFullYear() ? (
      <div>
        {props.film.title}{" "}
        <span className="badge badge-secondary ml-1">New</span>
      </div>
    ) : (
      props.film.title
    );

  return (
    <Card className={classes.card} m={2}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.film.title === null
              ? null
              : props.film.title.toUpperCase().slice(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {props.close ? <CloseIcon /> : null}
          </IconButton>
        }
        title={title}
        subheader={new Date(props.film.release_date).toDateString()}
      />

      <CardMedia
        className={classes.media}
        image={`https://image.tmdb.org/t/p/w500/${props.film.poster_path}`}
        title={props.film.name}
      />
      <CardContent />
      <CardActions>
        <Button
          variant="outlined"
          style={{
            color: "white",
            background: "#FF3366",
            marginRight: "10rem"
          }}
          onClick={() => {
            deletemovie();
          }}
        >
          delete
        </Button>
        <IconButton aria-label="share" edge="end">
          <ShareLink link={props.film.url}>
            {link => (
              <a href={link} target="_blank">
                <ShareIcon />
              </a>
            )}
          </ShareLink>
        </IconButton>
      </CardActions>
    </Card>
  );
}
