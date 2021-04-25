import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default function ContactForm(props) {
  const {
    formDialog,
    Transition,
    onHandlingFormDialog,
    dialogHeader,
    checkDetailContact,
    params,
    detailContact,
    onHandlingInput,
    onSaveContact,
    onUpdateContact,
  } = props;

  const { firstName, lastName, age, photo } = params;

  const listForm = [
    {
      id: "firstName",
      label: "First Name",
      value: firstName,
      validators: ["required", "minStringLength:3", "maxStringLength: 30"],
      errorMessages: [
        "First Name is required",
        "First Name must be at least 3 character",
        "First Name must be less than or equal to 30 character",
      ],
    },
    {
      id: "lastName",
      label: "Last Name",
      value: lastName,
      validators: ["required", "minStringLength:3", "maxStringLength: 30"],
      errorMessages: [
        "Last Name is required",
        "Last Name must be at least 3 character",
        "Last Name must be less than or equal to 30 character",
      ],
    },
    {
      id: "age",
      label: "Age",
      value: age,
      validators: [
        "required",
        "isNumber",
        "minNumber:0",
        `maxNumber: ${checkDetailContact ? "200" : "100"}`,
      ],
      errorMessages: [
        "Age is required",
        "Age must be number",
        "Age must be larger than or equal to 0",
        `Age must be less than or equal to ${
          checkDetailContact ? "200" : "100"
        }`,
      ],
    },
    {
      id: "photo",
      label: "Photo URL",
      value: photo,
      validators: ["required"],
      errorMessages: ["Photo URL is required"],
    },
  ];

  return (
    <Dialog
      maxWidth="sm"
      open={formDialog}
      TransitionComponent={Transition}
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      keepMounted
    >
      <DialogTitle className={dialogHeader}>
        {checkDetailContact ? "Add" : "Edit"} New Contact
      </DialogTitle>
      <ValidatorForm
        onSubmit={
          checkDetailContact
            ? onSaveContact.bind(this)
            : onUpdateContact.bind(this, detailContact.id)
        }
      >
        <DialogContent style={{ paddingBottom: 40 }} dividers>
          {listForm.map((form) => (
            <TextValidator
              key={form.id}
              id={form.id}
              label={form.label}
              color="primary"
              margin="dense"
              value={form.value}
              onChange={onHandlingInput}
              validators={form.validators}
              errorMessages={form.errorMessages}
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onHandlingFormDialog.bind(this, false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}
