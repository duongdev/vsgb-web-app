/* Global app settings */
import store from 'store';

const SET_WIDTH = 'redux/app/SET_WIDTH';

const initialState = {
  width: store.get('app-width') || 'md',
  bannersEditMode: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_WIDTH:
      store.set('app-width', action.width);
      return {
        ...state,
        width: action.width
      };
    default: return state;
  }
}

export const setWidth = width => ({ type: SET_WIDTH, width });
