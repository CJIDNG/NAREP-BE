
export const adminSignin = {
  email: 'nareptest@admin.com',
  password: 'Password124',
};

export const userSignin = {
  email: 'johndoe@test.com',
  password: 'PasswoRD123__',
};

export const newUserSignup = {
  username: 'Jand Doe',
  email: 'nareptest@admin.com',
  password: 'Password124',
  confirmPassword: 'Password124',
};

export const emptyUserData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const getUserData = (args) => ({
  ...newUserSignup,
  ...args,
});
