const initialState = {
  notesList: [],
};

const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NOTES_LIST':
      return Object.assign({}, state, {
        notesList: action.payload,
      });
    default:
      return state;
  }
};

export default asyncReducer;
