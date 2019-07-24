import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import repository from '../../store/repository';
import { Input, Button, Layout } from 'element-react';
import { inputStyle, buttonStyle } from '../styles/form.js';


const buttonRegister = {
  width: "100%"
}

const Login = ({ history }) => {
  const onSubmit = ({ username, password }) => {
    repository.post('/login', {
      username,
      password
    }).then(({ data }) => {
      if (data.token) {
        repository.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        localStorage.setItem('token', data.token);
        history.push('/app');
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
                <Field style={inputStyle} type="text" name="username" component="input" placeholder="Username" />
                <ErrorMessage name="username" component="div" />
              </div>
              <div>
                <Field style={inputStyle} type="password" name="password" component="input" placeholder="Password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <div>
                  <button style={buttonStyle} type="submit" disabled={isSubmitting}>Login</button>
              </div>
            </Form>
          )}
        >
        </Formik>
        <Link to="/register">
          <Button style={{...buttonRegister, marginTop: "20px"}} size="small" type="success">Create an account</Button>
        </Link>
      </Layout.Col>
      </Layout.Row>
    </>
  )
};

export default Login;
