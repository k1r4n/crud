
import store from '../store';

export const updateNotesList = (list) => (store.dispatch({
  type: 'UPDATE_NOTES_LIST',
  payload: list,
}));


