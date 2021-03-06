import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import repository from '../../store/repository';
import { Layout } from 'element-react';
import { buttonStyle, inputStyle } from '../styles/form.js';

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
    <Layout.Row style={ {marginTop: "50px"} } gutter="20" justify="space-around" type="flex">
    <Layout.Col span="6">
    <Formik
      initialValues={{
        username: 'hknorr',
        password: 'admin'
      }}
      onSubmit={onSubmit}
      render={({ isSubmitting }) => (
        <Form>
          <div>
            <Field style={inputStyle} type="text" name="username" component="input" placeholder="Username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <Field style={inputStyle} type="password" name="password" component="input" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <button style={buttonStyle} type="submit" disabled={isSubmitting}>Register</button>
          </div>
        </Form>
      )}
    >
    </Formik>
    </Layout.Col>
    </Layout.Row>
  )
};

export default Login;
