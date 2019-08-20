import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function generatePasswordHash(password) {
  const hashPassword = await bcrypt.hash(password, saltRounds)
    .catch(err => {
      throw err;
    });
  return hashPassword;
}