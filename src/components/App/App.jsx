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
   const defaultValue = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  const [contacts, setContacts] = useLocalStorage('contacts', defaultValue);
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
    const normalizedStr = value.trim().toLowerCase();
    setFilter(normalizedStr);
  };

  const filteredContacts =  () => {
      return [
      ...contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter)
      ),
    ];
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
