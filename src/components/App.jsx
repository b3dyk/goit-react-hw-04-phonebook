import { useState } from 'react';
import { customAlphabet } from 'nanoid';
import { useLocalStortage } from 'hooks/useLocalStorage';

import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const nanoid = customAlphabet('1234567890id', 4);

export const App = () => {
  const [contacts, setContacts] = useLocalStortage('contacts', []);
  const [filter, setFilter] = useState('');

  const addUser = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    if (contacts.find(({ name }) => name === data.name)) {
      alert(`${data.name} already in contacts`);
      return true;
    }

    setContacts(prevState => [...prevState, newContact]);
  };

  const handleDelete = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const handleSearch = ({ target: { value } }) => {
    setFilter(value.toLowerCase());
  };

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

      <ContactForm addUser={addUser} />

      <h2 className={css.heading}>Contacts</h2>

      <Filter filter={filter} onSearch={handleSearch} />

      <ContactList contacts={visibleContacts} onDelete={handleDelete} />
    </div>
  );
};
