import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://64383367f3a0c40814ad462e.mockapi.io/api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContsact',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${id}`);
      Notiflix.Notify.info(`The contact deleted`);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contsacts/addContact',
  async (values, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', {
        name: values.name,
        phone: values.phone,
      });
      Notiflix.Notify.success(`${values.name} added to contact books`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

