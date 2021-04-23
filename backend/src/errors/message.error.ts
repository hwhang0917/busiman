export const InvalidErr = {
  email: 'Invalid E-mail.',
  password: 'Invalid password.',
  token: 'Invalid token.',
};

export const ConflictsErr = {
  email: 'E-mail already exists.',
};

export const DNEerr = {
  employee: 'Employee does not exists.',
  email: 'E-mail does not exists.',
  client: 'Client does not exists.',
  project: 'Project does not exists.',
  document: 'Document does not exists.',
};

export const RequiredErr = {
  email: 'E-mail required.',
  password: 'Password required.',
  name: 'Name is required.',
  auth: 'Login is required.',
};

export const AuthErr = {
  admin: 'Only admin can do this.',
  approved: 'Only approved employees can do this.',
  account: 'Account owner or admin can edit.',
  project: 'Project manager or admin can edit/delete.',
  document: 'Document contributor or admin can edit/delete.',
};
