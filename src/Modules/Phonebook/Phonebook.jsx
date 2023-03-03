import { useSelector, useDispatch } from 'react-redux';

import styles from './phonebook.module.scss';
import ContactForm from './ContactForm/ContactForm';
import FindContact from './FindContact/FindContact';
import Button from 'Modules/Button/Button';

import { addContacts, deleteContacts } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';

import {
  getAllContacts,
  getFilterContacts,
} from '../../redux/contacts/contacts-selectors';

import { getFilter } from '../../redux/filter/filter-selectors';

const Phonebook = () => {

  const contactsFilter = useSelector(getFilterContacts);
  const contacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const handleAddContact = ({ name, number }) => {
    //----------------------  add friends filter ???
    if (isDublicate(name)) {
      return alert(`${name} is already in contacts`);
    }

    dispatch(addContacts({ name, number }));
  };

  const isDublicate = name => {
    const nameLower = name.toLowerCase();
    const dublicate = contacts.find(
      contact => contact.name.toLowerCase() === nameLower
    );
    return Boolean(dublicate);
  };

  const removeContact = id => {
    dispatch(deleteContacts({ id }));
  };

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };
  console.log(filter);
  const elementsLi = contactsFilter.map(({ id, name, number }) => (
    <li className={styles.li} key={id}>
      <div>
        {name} : {number}
      </div>
      <Button removeContact={removeContact} id={id} />
    </li>
  ));
  const elements =
    elementsLi && elementsLi.length
      ? elementsLi
      : 'Sorry, there are no contacts in Phonebook';
  return (
    <>
      <div className={styles.div}>

        <h3 className={styles.mainTitle}>Phonebook</h3>
        <ContactForm onSubmit={handleAddContact} />

        <h3 className={styles.mainTitle}>Contacts</h3>
        <div className={styles.find}>
          <FindContact handleFilter={handleFilter} />
          <ul>{elements}</ul>
        </div>
      </div>
    </>
  );
};

export default Phonebook;
