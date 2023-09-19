const initialState = {
    notes: [],
  };

  // Action types
export const CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';
export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTE_SUCCESS = 'FETCH_NOTE_SUCCESS';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';

// Action creators
export const createNoteSuccess = (note) => ({
  type: CREATE_NOTE_SUCCESS,
  payload: note,
});

export const fetchNotesSuccess = (notes) => ({
  type: FETCH_NOTES_SUCCESS,
  payload: notes,
});

export const fetchNoteSuccess = (note) => ({
  type: FETCH_NOTE_SUCCESS,
  payload: note,
});

export const deleteNoteSuccess = (noteId) => ({
  type: DELETE_NOTE_SUCCESS,
  payload: noteId,
});

// Thunk action creators
export const createNote = (noteData) => async (dispatch) => {
  const response = await fetch(`/api/jobs/${noteData.jobId}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteData),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(createNoteSuccess(data));
  }
};

export const fetchNotesForJob = (jobId) => async (dispatch) => {
  const response = await fetch(`/api/jobs/${jobId}/notes`);
  const data = await response.json();
  if (response.ok) {
    dispatch(fetchNotesSuccess(data.notes));
  }
};

export const fetchNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`);
  const data = await response.json();
  if (response.ok) {
    dispatch(fetchNoteSuccess(data.note));
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteNoteSuccess(noteId));
  }
};


const noteReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_NOTES_SUCCESS:
        return { ...state, loading: false, notes: action.payload, error: null };
      case CREATE_NOTE_SUCCESS:
        return { ...state, notes: [...state.notes, action.payload], error: null };
      case FETCH_NOTE_SUCCESS:
        return { ...state, loading: false, notes: [...state.notes, action.payload], error: null };
      case DELETE_NOTE_SUCCESS:
        return {
          ...state,
          notes: state.notes.filter((note) => note.id !== action.payload),
          error: null,
        };
      default:
        return state;
    }
  };

  export default noteReducer;
