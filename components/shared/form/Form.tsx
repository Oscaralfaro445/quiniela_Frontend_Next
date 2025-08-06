"use client";

import { Formik, FormikValues } from "formik";
import { AnyObjectSchema } from "yup";

interface FormProps<T extends FormikValues> {
  children: React.ReactNode;
  initialValues: T;
  onSubmit: (values: T) => void;
  validationSchema: AnyObjectSchema;
}

export const Form = <T extends FormikValues>({
  children,
  initialValues,
  onSubmit,
  validationSchema,
}: FormProps<T>) => {
  return (
    <Formik<T>
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={validationSchema}
    >
      {children}
    </Formik>
  );
};
