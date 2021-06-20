import * as bcrypt from 'bcrypt';

async function encryptPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const encrypted = await bcrypt.hash(password, saltRounds);
  return encrypted;
}

async function comparePassword(
  commingPassword: string,
  password: string,
): Promise<boolean> {
  return bcrypt.compare(commingPassword, password);
}

export { encryptPassword, comparePassword };
