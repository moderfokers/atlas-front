import NodeRSA from "node-rsa";

export const encryptPassword = (password: string): string => {
  const publicKey = process.env.RSA_PUBLIC as string;

  if (!publicKey) {
    throw new Error("Public key not found");
  }

  const key = new NodeRSA({ b: 512 });
  key.importKey(publicKey.replace(/\\n/g, "\n"), "public"); // Import the public key

  const encryptedPassword = key.encrypt(password, "base64"); // Encrypt the password
  return encryptedPassword; // Send the encrypted password to the backend
};
