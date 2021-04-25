import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    WebkitBoxShadow: "0px 0px 0px 2px rgba(230, 230, 230, 0.7)",
    MozBoxShadow: "0px 0px 0px 2px rgba(230, 230, 230, 0.7)",
    boxShadow: "0px 0px 0px 2px rgba(230, 230, 230, 0.7)",
  },
  cardMedia: {
    height: "24rem",
    width: "100%",
    maxWidth: "29rem",
    [theme.breakpoints.up("sm")]: {
      height: "17rem",
    },
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(3),
  },
}));

export default function ContactCard(props) {
  const { contact, onHandlingDetailDialog, checkPhoto } = props;
  const classes = useStyles();

  return (
    <Grid item key={contact.id} xs={12} sm={6} md={4}>
      <CardActionArea
        onClick={onHandlingDetailDialog.bind(this, contact.id, true)}
      >
        <Card className={classes.card}>
          <img
            className={classes.cardMedia}
            src={checkPhoto(contact)}
            alt={checkPhoto(contact)}
          />
          <Divider />
          <CardContent className={classes.cardContent}>
            <Typography variant="h5">{contact.firstName}</Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
