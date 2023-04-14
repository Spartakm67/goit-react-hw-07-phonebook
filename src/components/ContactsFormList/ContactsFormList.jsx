import { ContactsList, FeedbackButton } from './ContactsFormList.styled'
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, deleteContact } from 'redux/operations';
import {
  selectContacts,
  selectFilter,
  selectError,
} from 'redux/selectors';
import { useEffect } from 'react';
import Notiflix from 'notiflix';

export const ContactsFormList = () => {

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (error) {
    Notiflix.Notify.failure(`${error} Reload the page, please.`);
  }

  return (
    <ul>
      {filteredContacts.map(contact => (
        <ContactsList key={contact.id}>
          <span>
            {' '}
            {contact.name} : {contact.phone}{' '}
          </span>
          <FeedbackButton
            onClick={() => {
                dispatch(deleteContact(contact.id));
              }}
          >
            Delete
          </FeedbackButton>
        </ContactsList>
      ))}
    </ul>
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