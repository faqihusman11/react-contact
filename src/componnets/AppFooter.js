import React from "react";
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  appBar: {
    flexGrow: 1,
    marginTop: 25,
    top: "auto",
    bottom: 0,
    zIndex: "0",
  },
  text: {
    justifyContent: "center",
    fontSize: "62.5%",
  },
}));

export default function AppFooter(props) {
  const { loading } = props;
  const classes = useStyles();
  const currentYear = new Date().getFullYear();

  return (
    <AppBar
      position={loading ? "fixed" : "relative"}
      className={classes.appBar}
    >
      <Toolbar variant="dense" className={classes.text}>
        <Typography variant="body2">{`Copyright © React Contact ${currentYear}`}</Typography>
      </Toolbar>
    </AppBar>
  );
}
