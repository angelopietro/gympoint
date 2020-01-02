import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

/* -----SERVICES----- */
import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const { data } = yield call(api.get, `students/${id}/login`);

    yield put(
      signInSuccess(
        data.student_id,
        data.start_date,
        data.end_date,
        data.plan,
        data.active
      )
    );
  } catch (err) {
    Alert.alert(
      'Atenção!',
      `ID ${payload.id} não encontrado ou cadastro ainda não liberado pela academia!`
    );
    yield put(signInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
