import { generate, generateSecret, verify } from "2fa-util";

type Receipt = {
    qrcode: string;
    otpauth: string;
    secret: string;
};

/**
 * Generates a secret key and corresponding QR code for TOTP authentication.
 *
 * @param {string} publicKey The public key or identifier for which to generate the TOTP credentials.
 * @returns {Promise<Receipt>} A promise that resolves to the TOTP credentials including the QR code, otpauth URL, and secret.
 */
export const generateSecretKey = async (
    publicKey: string,
): Promise<Receipt> => {
    const receipt: Receipt = await generateSecret(publicKey, "OasisGuard");
    return receipt;
};

/**
 * Generates a TOTP token using a given secret.
 *
 * @param {string} secret The secret key used to generate the TOTP token.
 * @returns {string} The generated TOTP token.
 */
export const generateTOTP = (secret: string): string => {
    return generate(secret);
};

/**
 * Verifies a TOTP token against the expected secret.
 *
 * @param {string} secret The secret key to verify the token against.
 * @param {string} token The TOTP token to verify.
 * @returns {boolean} True if the verification is successful, false otherwise.
 */
export const verifyTOTP = (secret: string, token: string): boolean => {
    return verify(token, secret);
};
