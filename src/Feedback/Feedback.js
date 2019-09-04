import React from 'react'
import { Formik } from 'formik'

export default function Feedback() {
  return (
    <section>
      <h1>Feedback</h1>
      <Formik
        initialValues={{ text: '' }}
        validate={values => {
          let errors = {}
          if (!values.text) {
            errors.text = 'Required'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          setSubmitting(false)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.text}
            />
            {errors.text && touched.text && errors.text}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </section>
  )
}
