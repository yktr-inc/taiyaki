import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import repository from '../../store/repository';

const Login = ({ history }) => {
  const onSubmit = ({ username, password }) => {
    repository.post('/login', {
      username,
      password
    }).then(({ data }) => {
      if (data.token) {
        repository.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        localStorage.setItem('token', data.token);
        history.push('/');
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          username: 'hknorr',
          password: 'admin'
        }}
        onSubmit={onSubmit}
        render={({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="text" name="username" placeholder="Username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>Login</button>
            </div>
          </Form>
        )}
      >
      </Formik>
      <Link to="/register">Create an account</Link>
    </>
  )
};

export default Login;
