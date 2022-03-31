export const loginStart = () => ({
  type: 'LOGIN_START',
});

export const loginSuccess = user => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const loginFail = user => ({
  type: 'LOGIN_FAIL',
});
