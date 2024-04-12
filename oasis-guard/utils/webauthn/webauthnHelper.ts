import type {
  AuthenticateOptions,
  RegisterOptions
} from "@passwordless-id/webauthn/dist/esm/types"

export const getWebauthnRegisterOptions = (
  userHandle?: string
): {
  registerOptions: RegisterOptions
  authOptions: AuthenticateOptions
  algorithm: string
} => {
  return {
    registerOptions: {
      authenticatorType: "auto", // extern => remove browser
      userVerification: "required",
      timeout: 60000,
      attestation: false,
      debug: false,
      discoverable: "required",
      userHandle
    } as RegisterOptions,
    authOptions: {
      authenticatorType: "auto", // extern => remove browser
      userVerification: "required",
      timeout: 60000
    } as AuthenticateOptions,
    algorithm: "ES256"
  }
}
