import React, { Component } from 'react';
import PropTypes from 'prop-types';

import inititalState from './InitialState';
import styles from './ContactForm.module.css';

class PhonebooksForm extends Component {
  state = { ...inititalState };

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

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { name, number, contacts } = this.state;

    if (!name || !number) {
      alert('Please fill in this field');
      return;
    }

    const newContact = { name, number };
    const result = onSubmit(newContact);

    if (result) {
      this.setState({
        contacts: [...contacts, newContact],
      });
      this.reset();
    }
  };

  reset() {
    this.setState({ ...inititalState });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.text}>Name</label>
          <input
            className={styles.input}
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.text}>Number</label>
          <input
            className={styles.input}
            name="number"
            value={number}
            onChange={handleChange}
            placeholder="Enter number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button className={styles.btn} type="submit">
          <strong>ADD CONTACT</strong>
        </button>
      </form>
    );
  }
}

PhonebooksForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PhonebooksForm;


  
