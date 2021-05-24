import React, { useEffect} from 'react'
import {connect} from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

import {getName, setName} from '../store/actions'
import {nameSelector} from '../store/selectors'

const MyForm = ({ setName }) => (
  <div>
     <Formik
       initialValues={{ name: '' }}
       validationSchema={Yup.object({
         name: Yup.string().required("Name is required").min(2, "Minimum 2 characters needed")
       })}
       onSubmit={(values, { setSubmitting }) => {
          setName(values.name)
          setSubmitting(false)
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

)

const Demo = ({ getName, setName, name }) => {
  useEffect(() => {
    getName()
  }, [getName])

  return (
    <div>
      <h1>{name}</h1>
      <MyForm setName={setName}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    name: nameSelector(state)

  }
}

export default connect(mapStateToProps, { getName, setName})(Demo)
