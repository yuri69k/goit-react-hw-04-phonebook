import { useState } from 'react';
import useLocalStorage from 'Hooks/useLocalStorage';
import styles from './styles.module.css';
import { BsJournalBookmark } from 'react-icons/bs';
import Form from '../Form';
import Contacts from '../Contacts';
import Filter from '../Filter';
import shortid from 'shortid';
import Notiflix from 'notiflix';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact =   ({ name, number }) => {
    contacts.some(contact => contact.name === name)
      ? Notiflix.Notify.info(`${name} is already in contacts.`)
      : setContacts([
          {
            id: shortid.generate(),
            name: name.trim(),
            number,
          },
          ...contacts,
        ]);
  };


  const onFilterInput = value => {
    setFilter(value);
  };

  const filteredContacts = () => {
    return [...contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    ),];
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <h1>
        Phonebook <BsJournalBookmark size={35} className={styles.icon} />
      </h1>
      <Form addContact={addContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter onFilterInput={onFilterInput} />
      <Contacts
        contacts={contacts}
        filter={filter}
        filteredContacts={filteredContacts}
        deleteContact={deleteContact}
      />
      {contacts.length === 0 && (
        <p style={{ textDecoration: 'underline' }}>no contacts available</p>
      )}
    </div>
  );
};

export default App;
