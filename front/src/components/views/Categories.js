import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useStateValue } from '../../store/state';
import repository from '../../store/repository';
import { Button, Layout, Table } from 'element-react';
import { buttonStyle, inputStyle } from '../styles/form.js';

const containerStyle = {
  width: '80vw',
  margin: 'auto'
};

const marginBlock = {
  marginTop: '50px',
};

const categoriesStyle = {
  minHeight: "92vh",
  a: {
    decoration: "none",
  }
};

const Categories = ({ history }) => {

  const [{ categories }, dispatch] = useStateValue();

  const [newCategory, setNewCategory] = React.useState(null);

  const columns = [
    {
      label: 'Label',
      prop: 'label'
    },
    {
      label: "Operations",
      width: 120,
      render: (row, column, index)=>{
        return <Button type="text" onClick={() => deleteCategory(row)} size="small">Delete</Button>
      }
    }
  ];

  useEffect(() => {
    repository.get('/categories').then(res => {
      if (res.status === 200) {
        dispatch({
          type: 'setCategories',
          categories: res.data
        });
      }
    });
  }, [dispatch]);

  const deleteCategory = row => {
      repository.delete(`/categories/${row._id}`).then(res => {
        if (res.status === 204) {
          dispatch({
            type: 'deleteCateogry',
            id: row._id
          });
        }
      });
  }

  const onSubmit = ({ label }) => {
    repository.post('/categories', { label }).then(res => {
      if (res.status === 201) {
        dispatch({
          type: 'addCategory',
          category: res.data
        });
      }
    });
  }

  return (
    <>
    <Layout.Row gutter={20} style={marginBlock} type="flex" justify="center">
        <Layout.Col span="12" >
          <Formik
            initialValues={{
              label: 'example',
            }}
            onSubmit={onSubmit}
            render={({ isSubmitting }) => (
              <Form>
                <div>
                  <Field style={inputStyle} type="text" name="label" component="input" placeholder="New category" />
                  <ErrorMessage name="label" component="div" />
                </div>
                <div>
                    <button style={buttonStyle} type="submit" disabled={isSubmitting}>Add new category</button>
                </div>
              </Form>
            )}
          >
          </Formik>
        <Table
          style={{width: '100%'}}
          columns={columns}
          data={categories}
          stripe={true}
          emptyText="No data"
        />
        </Layout.Col>
      </Layout.Row>
    </>
  );
};

export default Categories;
