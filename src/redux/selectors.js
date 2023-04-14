// export const getContacts = state => state.contacts;
// export const getFilter = state => state.filter;

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.filter;
export const selectLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
 