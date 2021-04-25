import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Grid,
  Icon,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  imageContent: {
    width: 200,
    height: 200,
  },
  image: {
    margin: "auto",
    display: "block",
    height: "15rem",
    width: "15rem",
    [theme.breakpoints.up("sm")]: {
      height: "12rem",
      maxWidth: "100%",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: "#fff",
    cursor: "pointer",
  },
}));

export default function ContactDetail(props) {
  const {
    detailDialog,
    Transition,
    onHandlingDetailDialog,
    onHandlingFormDialog,
    dialogHeader,
    detailContact,
    checkPhoto,
    onDeleteContact,
  } = props;
  const classes = useStyles();

  const listInfo = [
    { name: "First Name", value: detailContact.firstName },
    { name: "Last Name", value: detailContact.lastName },
    { name: "Age", value: `${detailContact.age} Years Old` },
  ];

  return (
    <Dialog
      maxWidth="sm"
      open={detailDialog}
      TransitionComponent={Transition}
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      keepMounted
    >
      <DialogTitle className={dialogHeader} disableTypography>
        <Typography variant="h5">Contact Detail</Typography>
        <Icon
          className={classes.closeButton}
          onClick={onHandlingDetailDialog.bind(this, {}, false)}
        >
          close
        </Icon>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={4}>
          <Grid item>
            <DialogContentText className={classes.imageContent}>
              <img
                className={classes.image}
                alt="complex"
                src={checkPhoto(detailContact)}
              />
            </DialogContentText>
          </Grid>
          <Grid item xs={6} sm container>
            <Grid item xs container direction="column">
              {listInfo.map((item) => (
                <Grid key={item.name} item xs>
                  <DialogContentText>
                    <Typography
                      variant="subtitle1"
                      style={{ opacity: "0.7", fontWeight: "bolder" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      style={{ fontWeight: "bolder" }}
                    >
                      {item.value}
                    </Typography>
                  </DialogContentText>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onDeleteContact.bind(this, detailContact.id)}
          color="secondary"
        >
          Delete
        </Button>
        <Button onClick={onHandlingFormDialog.bind(this, true)} color="primary">
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
