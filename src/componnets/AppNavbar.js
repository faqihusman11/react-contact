import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default function AppNavbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5">React Contact</Typography>
      </Toolbar>
    </AppBar>
  );
}
