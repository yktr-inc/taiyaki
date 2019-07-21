import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import repository from '../../store/repository';
import { Input, Button, Layout } from 'element-react';

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
              <Field type="text" name="username" component={Input} placeholder="Username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <Field type="password" name="password" component={Input} placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <Button>
                <button type="submit" disabled={isSubmitting}>Login</button>
              </Button>
            </div>
          </Form>
        )}
      >
      </Formik>
      <Link to="/register">
        <Button type="success">Create an account</Button>
      </Link>
      </Layout.Col>
      </Layout.Row>
    </>
  )
};

export default Login;
