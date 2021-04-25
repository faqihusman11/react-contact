import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  makeStyles,
  Container,
  Icon,
  Fab,
  Grid,
  Slide,
} from "@material-ui/core";
import { baseURL, noImage } from "./store";
import AppNavbar from "./componnets/AppNavbar";
import AppFooter from "./componnets/AppFooter";
import ContactCard from "./componnets/ContactCard";
import ContactDetail from "./componnets/ContactDetail";
import AppLoading from "./componnets/AppLoading";
import AppAlert from "./componnets/AppAlert";
import ContactForm from "./componnets/ContactForm";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#3F51B5",
    fontSize: 100,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(12, 0, 6),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(1),
    zIndex: "1",
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  dialogHeader: {
    color: "#fff",
    backgroundColor: "#3F51B5",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function App() {
  const classes = useStyles();
  const [listContact, setListContact] = useState([]);
  const [detailContact, setDetailContact] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const [detailDialog, setDetailDialog] = useState(false);
  const [formDialog, setFormDialog] = useState(false);
  const [params, setParams] = useState({
    firstName: "",
    lastName: "",
    age: "",
    photo: "",
  });
  const checkDetailContact = Object.keys(detailContact).length === 0;

  const onHandlingAlert = (type, message) => {
    setAlert({
      isOpen: true,
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert({
        isOpen: false,
        type: type,
        message: message,
      });
    }, 2000);
  };

  const onGetListContact = async () => {
    setLoading(true);
    setListContact([]);
    await axios({
      method: "get",
      baseURL: baseURL,
      url: `/contact`,
    })
      .then((res) => {
        const data = res.data.data;
        setListContact(data);
        setLoading(false);
      })
      .catch((err) => {
        onHandlingAlert("error", "Error while get list contact!");
        setListContact([]);
        setLoading(false);
      });
  };

  const checkPhoto = (data) => {
    return data.photo && data.photo !== "N/A" ? data.photo : noImage;
  };

  const onHandlingFormDialog = (data) => {
    if (data) {
      setFormDialog(data);
      setParams({
        firstName: checkDetailContact ? "" : detailContact.firstName,
        lastName: checkDetailContact ? "" : detailContact.lastName,
        age: checkDetailContact ? "" : detailContact.age,
        photo: checkDetailContact ? "" : detailContact.photo,
      });
    } else {
      setFormDialog(data);
      setParams({
        firstName: "",
        lastName: "",
        age: "",
        photo: "",
      });
    }
  };

  const onHandlingDetailDialog = async (data, boolean) => {
    if (boolean) {
      if (!data) return false;
      setLoading(true);
      await axios({
        method: "get",
        baseURL: baseURL,
        url: `/contact/${data}`,
      })
        .then((res) => {
          setDetailContact(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          onHandlingAlert("error", "Error while get detail contact!");
        });
      setDetailDialog(boolean);
    } else {
      setDetailContact(data);
      setDetailDialog(boolean);
    }
  };

  const onHandlingInput = (e) => {
    setParams({ ...params, [e.target.id]: e.target.value });
  };

  const onSaveContact = async () => {
    await axios({
      method: "post",
      baseURL: baseURL,
      url: "/contact",
      data: params,
    })
      .then((res) => {
        onHandlingAlert("success", res.data.message);
        onHandlingFormDialog(false);
        onGetListContact();
      })
      .catch((err) => {
        onHandlingAlert("error", "Error while add new contact!");
      });
  };

  const onUpdateContact = async (data) => {
    await axios({
      method: "put",
      baseURL: baseURL,
      url: `/contact/${data}`,
      data: params,
    })
      .then((res) => {
        onHandlingAlert("success", res.data.message);
        onHandlingFormDialog(false);
        onHandlingDetailDialog({}, false);
        onGetListContact();
      })
      .catch((err) => {
        onHandlingAlert("error", "Error while update contact!");
      });
  };

  const onDeleteContact = async (data) => {
    await axios({
      method: "delete",
      baseURL: baseURL,
      url: `/contact/${data}`,
    })
      .then((res) => {
        onHandlingAlert("success", res.data.message);
        onHandlingDetailDialog({}, false);
        onGetListContact();
      })
      .catch((err) => {
        onHandlingAlert("error", "Error while delete contact!");
      });
  };

  useEffect(() => {
    onGetListContact();
  }, []);

  return (
    <div>
      <AppLoading loading={loading} />
      <AppAlert alert={alert} />
      <AppNavbar />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography align="center">
              <Icon className={classes.icon}>account_circle</Icon>
            </Typography>
            <Typography variant="h3" align="center">
              List Contact
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {listContact.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onHandlingDetailDialog={onHandlingDetailDialog}
                checkPhoto={checkPhoto}
              />
            ))}
          </Grid>
        </Container>

        {detailDialog ? (
          <ContactDetail
            detailDialog={detailDialog}
            Transition={Transition}
            onHandlingDetailDialog={onHandlingDetailDialog}
            onHandlingFormDialog={onHandlingFormDialog}
            dialogHeader={classes.dialogHeader}
            detailContact={detailContact}
            checkPhoto={checkPhoto}
            onDeleteContact={onDeleteContact}
          />
        ) : null}

        {formDialog ? (
          <ContactForm
            formDialog={formDialog}
            Transition={Transition}
            onHandlingFormDialog={onHandlingFormDialog}
            dialogHeader={classes.dialogHeader}
            checkDetailContact={checkDetailContact}
            params={params}
            detailContact={detailContact}
            onHandlingInput={onHandlingInput}
            onSaveContact={onSaveContact}
            onUpdateContact={onUpdateContact}
          />
        ) : null}

        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => onHandlingFormDialog(true)}
        >
          <Icon>add</Icon>
        </Fab>
      </main>
      <AppFooter loading={loading} />
    </div>
  );
}
