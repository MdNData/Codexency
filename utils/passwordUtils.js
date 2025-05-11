import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Errore nell'hashing della password:", error);
    throw new Error("Errore nell'hashing della password");
  }
};

export const validatePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Errore nella validazione della password:", error);
    throw new Error("Errore nella validazione della password");
  }
};
