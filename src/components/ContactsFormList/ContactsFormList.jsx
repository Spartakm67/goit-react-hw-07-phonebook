import { ContactsList, FeedbackButton } from './ContactsFormList.styled'
import { useSelector, useDispatch } from 'react-redux';
// import { getContacts, getFilter } from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations';
import {
  selectContacts,
  selectFilter,
  // selectLoading,
  // selectError,
} from 'redux/selectors';
import { useEffect } from 'react';

export const ContactsFormList = () => {

  const dispatch = useDispatch();
  // const error = useSelector(selectError);
  // const loading = useSelector(selectLoading);
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul>
      {filteredContacts.map(contact => (
        <ContactsList key={contact.id}>
          <span>
            {' '}
            {contact.name} : {contact.number}{' '}
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

