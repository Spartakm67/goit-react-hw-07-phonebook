import { ContactsList, FeedbackButton } from './ContactsFormList.styled'
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';

export const ContactsFormList = () => {

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

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

