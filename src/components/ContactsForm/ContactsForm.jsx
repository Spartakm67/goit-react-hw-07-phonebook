import { Formik, Field } from 'formik';
import { Form, FormField, ErrorMessage, FormButton } from './ContactsForm.styled';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts, selectError } from 'redux/selectors';
import Notiflix from 'notiflix';

const phoneSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      `Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`
    )
    .required('Required, please Add Name!!!'),

  phone: Yup.string()
    .matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,`Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`)
    .required('Required, please Add Phone Number!!!'),
});


export const ContactsForm = () => {

  const initialValue = {
  name: '',
  phone: '',
  };
  
const dispatch = useDispatch();
const contacts = useSelector(selectContacts);
const error = useSelector(selectError);  
  
  function handleSubmit(values, { resetForm }) {

    console.log("Hello");
    
    const isName = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isName) {
      Notiflix.Notify.info(`Hey, "${values.name}" is already in contacts!`);
      resetForm();
      return;
    } else {
      dispatch(addContact(values));
      resetForm();
    }
  }
  
if (error) {
    Notiflix.Notify.failure(`${error} Reload the page, please.`);
  }

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={phoneSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField>
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />
        </FormField>

        <FormField>
          Number
          <Field type="tel" name="phone"/>
          <ErrorMessage name="phone" component="div" />
        </FormField>

        <FormButton type="submit">Add contact</FormButton>
      </Form>
    </Formik>
  );
};

Notiflix.Notify.init({
  position: 'right-top',
  width: '400px',
  distance: '10px',
  opacity: 1,
  rtl: false,
  timeout: 1500,
});