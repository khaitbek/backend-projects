import { compareSync, hashSync } from "bcrypt";

/**
 * Hashes the password using bcrypt
 * @param password The password to be hashed
 * @returns The hashed password
 */
export const hashPassword = (password: string): string => {
  return hashSync(password, 10);
};

/**
 * Compares the password with the hashed password
 * @param password The password to be compared
 * @param hash The hashed password
 * @returns True if the password matches the hashed password, false otherwise
 */
export const comparePassword = (password: string, hash: string): boolean => {
  return compareSync(password, hash);
};
