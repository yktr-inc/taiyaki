import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import repository from '../../store/repository';
import { Input, Button } from 'element-react';

const Login = ({ history }) => {
  const onSubmit = ({ username, password }) => {
    repository.post('/register', {
      username,
      password
    }).then((res) => {
      if (res.status === 201) {
        repository.post('/login', {
          username,
          password
        }).then(({ data }) => {
          if (data.token) {
            repository.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            localStorage.setItem('token', data.token);
            history.push('/');
          }
        })
      }
    });
  };

  return (
    <Formik
      initialValues={{
        username: 'hknorr',
        password: 'admin'
      }}
      onSubmit={onSubmit}
      render={({ isSubmitting }) => (
        <Form>
          <div>
            <Field type="text" name="username" component="input" placeholder="Username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <Field type="password" name="password" component="input" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>Register</button>
          </div>
        </Form>
      )}
    >
    </Formik>
  )
};

export default Login;
