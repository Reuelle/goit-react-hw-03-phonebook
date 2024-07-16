// src/components/App/App.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, removeContact, setFilter } from '../../redux/actions';
import { getContacts, getFilter } from '../../redux/selectors';
import PhonebooksForm from '../ContactForm/ContactForm';
import PhonebookList from '../ContactList/ContactList';
import PhonebooksFilter from '../ContactFilter/ContactFilter';
import styles from './Contact.module.css';

const Phonebooks = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleAddContact = ({ name, number }) => {
    if (isDuplicate(name, number)) {
      alert(`${name}: ${number} already exists`);
      return false;
    }
    dispatch(addContact(name, number));
    return true;
  };

  const handleRemoveContact = id => {
    dispatch(removeContact(id));
  };

  const handleFilterChange = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isDuplicate = (name, number) => {
    const normalizedTitle = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const result = contacts.find(contact => {
      return (
        contact.name.toLowerCase() === normalizedTitle &&
        contact.number.toLowerCase() === normalizedNumber
      );
    });

    return Boolean(result);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter) ||
      contact.number.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <h1>Phonebook</h1>
        <PhonebooksForm onSubmit={handleAddContact} />
      </div>
      <div className={styles.block}>
        <PhonebooksFilter handleChange={handleFilterChange} />
        {isContacts ? (
          <PhonebookList contacts={filteredContacts} removeContact={handleRemoveContact} />
        ) : (
          <p>No contacts in list</p>
        )}
      </div>
    </div>
  );
};

export default Phonebooks;
