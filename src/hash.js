import { hash } from "bcrypt";

/**
 *
 * @param {string} password
 * @returns {Promise<string>} The hashed password
 *
 * Hashes a password using Argon2
 */
export async function hashPassword(password) {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
}

// this file will be called as a script and will hash the password passed as an argument

const password = process.argv[2];
if (!password) {
  console.error("Please provide a password to hash");
  process.exit(1);
}
hashPassword(password)
  .then((hash) => {
    console.log(`Hash: ${hash}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
