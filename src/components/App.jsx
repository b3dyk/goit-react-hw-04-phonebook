import { Component } from 'react';
import { customAlphabet } from 'nanoid';

import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const nanoid = customAlphabet('1234567890id', 4);

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    this.setState({ contacts });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addUser = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    if (this.state.contacts.find(({ name }) => name === data.name)) {
      alert(`${data.name} already in contacts`);
      return true;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
    return;
  };

  handleDelete = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  handleSearch = ({ target: { value } }) => {
    const searchValue = value.toLowerCase();
    this.setState({ filter: searchValue });
  };

  render() {
    const { contacts, filter } = this.state;

    const visibleContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    );

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#122236',
          fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
          marginTop: '16px',
          fontSize: '24px',
        }}
      >
        <h1 className={css.mainHeading}>Phonebook</h1>

        <ContactForm addUser={this.addUser} />

        <h2 className={css.heading}>Contacts</h2>

        <Filter filter={filter} onSearch={this.handleSearch} />

        <ContactList contacts={visibleContacts} onDelete={this.handleDelete} />
      </div>
    );
  }
}
