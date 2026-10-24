export const ADMIN_CREDENTIALS = {
  email: 'chaitnaya.a@gmail.com',
  password: 'Pass@123'
};

export function verifyAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
}
