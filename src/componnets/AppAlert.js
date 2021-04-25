import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AppAlert(props) {
  const { alert } = props;
  const { isOpen, message, type } = alert;
  const alertPosition = {
    vertical: "top",
    horizontal: "center",
  };

  return (
    <Snackbar open={isOpen} anchorOrigin={alertPosition}>
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
}
