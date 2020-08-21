import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    right: 0,
    padding: theme.spacing(3),
    position: "relative",
    top: 0,
    width: "100%",
    zIndex: 2000
  },
  logo: {
    width: 200,
    maxWidth: "100%"
  }
}));

function SlashScreen() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

export default SlashScreen;
