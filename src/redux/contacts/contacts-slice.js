import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79', friend: true },
    { id: nanoid(), name: 'Annie Copeland', number: '645-45-85', friend: true },
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56', friend: false },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12', friend: true },
  ],
  reducers: {
    addContacts: {
      reducer: (state, { payload }) => {
        state.push(payload);
      },
      prepare: data => {
        return {
          payload: {
            id: nanoid(),
            ...data,
          },
        };
      },
    },
    deleteContacts: {
      reducer: (state, { payload }) =>
        state.filter(contact => contact.id !== payload.id),
    },
  },
});

export const { addContacts, deleteContacts } = contactsSlice.actions ;
export default contactsSlice.reducer;
