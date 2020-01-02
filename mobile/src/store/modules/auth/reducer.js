import produce from 'immer';

const INITIAL_STATE = {
  user: {},
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST':
        draft.loading = true;
        break;

      case '@auth/SIGN_IN_SUCCESS':
        draft.user = action.payload;
        draft.signed = true;
        draft.loading = false;
        break;

      case '@auth/SIGN_IN_FAILURE':
        draft.signed = false;
        draft.loading = false;
        break;

      case '@auth/SIGN_OUT':
        draft.user = {};
        draft.signed = false;
        break;

      default:
    }
  });
}
