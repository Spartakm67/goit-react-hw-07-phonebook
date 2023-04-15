// import { Container, IfEmpty, DefaultButton } from "./App.styled";
import { Container, IfEmpty } from "./App.styled";
import { ContactsForm } from "./ContactsForm/ContactsForm";
import { ContactsFormList } from './ContactsFormList/ContactsFormList';
import { Filter } from './Filter/Filter';
import { useSelector } from 'react-redux';
import { selectContacts, selectLoading,  selectError } from 'redux/selectors';
import Notiflix from 'notiflix';

export const App = () => {

const contacts = useSelector(selectContacts);
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
      <ContactsFormList />
      {contacts.length > 0 ? (
       <IfEmpty> All Contacts have been succesfully uploaded</IfEmpty>
      ) : (
        <IfEmpty> Phonebook is empty</IfEmpty>      
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
