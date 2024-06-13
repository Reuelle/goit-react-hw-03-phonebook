import { Component } from 'react';
import { nanoid } from 'nanoid';
import PhonebooksForm from './ContactForm/ContactForm';
import PhonebookList from './ContactList/ContactList';
import PhonebooksFilter from './ContactFilter/ContactFilter';
import styles from './Contact.module.css';

class Phonebooks extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      alert(`${name}: ${number} is already exist`);
      return false;
    }

    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [newContact, ...contacts] };
    });
    return true;
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  isDublicate(name, number) {
    const normalizedTitle = name.toLowerCase();
    const normalizedAuthor = number.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(contact => {
      return (
        contact.name.toLowerCase() === normalizedTitle &&
        contact.number.toLowerCase() === normalizedAuthor
      );
    });

    return Boolean(result);
  }

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.toLowerCase().includes(normalizedFilter)
      );
    });

    return result;
  }

  render() {
    const { addContact, removeContact, handleFilter } = this;
    const contacts = this.getFilteredContacts();
    const isContacts = Boolean(contacts.length);

    return (
      <div classname={styles['center-container']}>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h1>Phonebook</h1>
          <PhonebooksForm onSubmit={addContact} />
        </div>
        <div className={styles.block}>
          <PhonebooksFilter handleChange={handleFilter} />
          {isContacts && (
            <PhonebookList removeContact={removeContact} contacts={contacts} />
          )}
          {!isContacts && <p>No contacts in list</p>}
        </div>
      </div>
    );
  }
}

export default Phonebooks;
