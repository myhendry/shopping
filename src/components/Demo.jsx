import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getName, setName, getTitle, transfer } from "../store/actions";
import {
  nameSelector,
  allTransfersLoadedSelector,
  allTransfersSelector,
} from "../store/selectors";

const NameForm = ({ setName }) => (
  <div>
    <Formik
      initialValues={{ name: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("Name is required")
          .min(2, "Minimum 2 characters needed"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setName(values.name);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="name" name="name" placeholder="Name" />
          <ErrorMessage name="name" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

const TransferForm = ({ transfer }) => (
  <div>
    <Formik
      initialValues={{ title: "" }}
      validationSchema={Yup.object({})}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        transfer(values.title);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="title" name="title" placeholder="Title" />
          <ErrorMessage name="title" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Transfer
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

const Demo = ({
  getName,
  setName,
  name,
  getTitle,
  transfer,
  allTransfersLoaded,
  allTransfers,
}) => {
  useEffect(() => {
    getName();
    getTitle();
  }, [getName, getTitle]);

  return (
    <div>
      <h1>{name}</h1>
      <NameForm setName={setName} />
      <TransferForm transfer={transfer} />
      {allTransfersLoaded ? (
        <div>
          {allTransfers.map((x, i) => (
            <div key={i}>
              <p>{x.amount}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allTransfersLoaded: allTransfersLoadedSelector(state),
    allTransfers: allTransfersSelector(state),
    name: nameSelector(state),
  };
};

export default connect(mapStateToProps, {
  getName,
  setName,
  getTitle,
  transfer,
})(Demo);
