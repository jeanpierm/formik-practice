import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';

interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

const userInitialValue: IUser = {
  name: '',
  username: '',
  email: '',
  password: '',
};

function SignupForm(): JSX.Element {
  const formikRef = useRef<FormikProps<IUser>>(null);
  const [userLogged, setUserLogged] = useState<IUser>(userInitialValue);

  useEffect(() => {
    const userLogged = sessionStorage.getItem('user');
    if (!userLogged) return;
    const user = JSON.parse(userLogged) as IUser;
    formikRef.current?.setFieldValue('name', user.name);
    formikRef.current?.setFieldValue('username', user.username);
    formikRef.current?.setFieldValue('email', user.email);
    formikRef.current?.setFieldValue('password', user.password);
  }, []);

  const validationSchema = yup.object({
    name: yup
      .string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    username: yup
      .string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup
      .string()
      .min(5, 'Must be 5 characters or more')
      .max(30, 'Must be 30 characters or less')
      .required('Required'),
  });

  const handleSubmit = (
    values: IUser,
    { setSubmitting }: FormikHelpers<IUser>
  ) => {
    setUserLogged(values);
    setSubmitting(false);
    sessionStorage.setItem('user', JSON.stringify(values));
  };

  return (
    <div>
      <h1>Anywhere in your app!</h1>
      {console.log(userLogged)}
      <Formik
        innerRef={formikRef}
        initialValues={userLogged}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <Field type="text" name="username" placeholder="Username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <button type="reset">Reset</button>
          </Form>
        )}
      </Formik>

      <div>
        <pre>{JSON.stringify(userLogged, null, 2)}</pre>
      </div>
    </div>
  );
}

export default SignupForm;
