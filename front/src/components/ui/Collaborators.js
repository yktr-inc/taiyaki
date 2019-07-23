import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import repository from '../../store/repository';

Modal.setAppElement('#root');

const Collaborators = ({ noteId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    repository.get('/users').then(({ data }) => {
      setUsers(data);
    })
  }, []);

  const handleChange = ({ collaborator }) => {
    repository.patch(`/notes/${noteId}`, { collaborator });
  };

  return (
    <>
      <Formik
        initialValues={{
          collaborator: '',
        }}
        onSubmit={handleChange}
        render={({ isSubmitting }) => (
          <Form>
            <div>
              <Field name="collaborator" component="select" placeholder="Add collaborator">
                <option defaultValue>Add collaborator</option>
                {users.map(u => <option key={u._id} value={u._id}>{u.username}</option>)}
              </Field>
              <ErrorMessage name="collaborator" component="div" />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>Add</button>
            </div>
          </Form>
        )}
      >
      </Formik>
    </>
  );
};

export default Collaborators;
