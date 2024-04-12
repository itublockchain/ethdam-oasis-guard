import { client } from "@passwordless-id/webauthn"
import type {
  AuthenticationEncoded,
  RegistrationEncoded
} from "@passwordless-id/webauthn/dist/esm/types"

import { getWebauthnRegisterOptions } from "./webauthnHelper"

export const register = async (
  username: string,
  userHandle: string,
  challenge: string
): Promise<RegistrationEncoded> => {
  const registration = await client.register(
    username,
    challenge,
    getWebauthnRegisterOptions(userHandle).registerOptions
  )
  return registration
}

export const authenticate = async (
  credentialId: Array<string>,
  challenge: string
): Promise<AuthenticationEncoded> => {
  const login = await client.authenticate(
    credentialId,
    challenge,
    getWebauthnRegisterOptions().authOptions
  )

  return login
}
