// import { Container, IfEmpty, DefaultButton } from "./App.styled"; 
import { Container, IfEmpty } from "./App.styled";
import { ContactsForm } from "./ContactsForm/ContactsForm";
import { ContactsFormList } from './ContactsFormList/ContactsFormList';
import { Filter } from './Filter/Filter';
import { useSelector } from 'react-redux';
// import { useDispatch } from "react-redux";
// import { getContacts } from 'redux/selectors';
// import { addInitialContacts } from '../redux/contactsSlice';
import {
  selectContacts,
  selectLoading,
  selectError,
} from 'redux/selectors';
import Notiflix from 'notiflix';

export const App = () => {

const contacts = useSelector(selectContacts);
// const dispatch = useDispatch();
    
  // const addDefaultContacts = () => {
        
  //   setTimeout(() => {
  //     dispatch(addInitialContacts());
    
  //   }, 2000);
    
  //   Notiflix.Notify.failure(`Really??? :)`);
  //   return;
  // };
  
const loading = useSelector(selectLoading);
const error = useSelector(selectError);
  if (error) {
    Notiflix.Notify.failure(`Please reload the page. ${error} `);
  }
  
  return (
    <Container>
        
      <h1>Phonebook</h1>
      <ContactsForm />
      <h2>Contacts</h2>
      {loading && <div>Loading contacts...</div>}
      <Filter />
      {contacts.length > 0 ? (
        <ContactsFormList />
      ) : (
        <><IfEmpty> Phonebook is empty</IfEmpty>
          {/* <DefaultButton type='button' onClick={addDefaultContacts}>
            Click to Add Default Contacts
          </DefaultButton>  */}
        </>
      )}
        
    </Container>);
};

Notiflix.Notify.init({
  position: 'right-top',
  width: '400px',
  distance: '10px',
  opacity: 1,
  rtl: false,
  timeout: 2000,
});
