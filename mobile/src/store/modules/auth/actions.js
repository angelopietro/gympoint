export function signInRequest(id) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { id },
  };
}

export function signInSuccess(
  student_id,
  start_date,
  end_date,
  student,
  plan,
  active
) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { student_id, start_date, end_date, student, plan, active },
  };
}

export function signInFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
