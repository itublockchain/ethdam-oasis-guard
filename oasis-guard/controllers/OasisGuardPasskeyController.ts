import { Buffer } from "buffer";

import {
    authenticate,
    formatHex,
    getCurrentDateReadable,
    register,
} from "~utils";

export class OasisGuardPasskeyController {
    static CHALLENGE = "deadbeefdeadbeef";
    /**
     *
     * @dev Get display name of the passkey
     */
    static getDisplayName(): string {
        const readableDate = getCurrentDateReadable();
        return "Wallet Created at " + readableDate;
    }

    /**
     * @dev Create new passkey
     * @returns Registration response
     */
    static async register(id: string) {
        return await register(getCurrentDateReadable(), id, this.CHALLENGE);
    }
    /**
     * @dev Authenticate passkey
     * @returns Authentication response
     */
    static async auth(credentialId: string[] = []) {
        return await authenticate(credentialId, this.CHALLENGE);
    }

    /**
     *
     * @param base64 base64 encoded string
     * @returns hex encoded string
     */
    static base64ToHex(base64: string): string {
        return Buffer.from(base64, "base64").toString("hex");
    }

    /**
     *
     * @param base64url base64url encoded string
     * @returns utf-8 string
     */
    static base64UrlToUtf8(base64Url: string): string {
        return Buffer.from(base64Url, "base64").toString();
    }

    static async getPublicKeyFromPublicKeyCose(
        publicKeyCose: string,
    ): Promise<string> {
        const publicKeyBuffer = Buffer.from(publicKeyCose, "base64");
        const rawPubkey = await crypto.subtle.exportKey(
            "jwk",
            await this.getKey(publicKeyBuffer),
        );
        const { x, y } = rawPubkey;
        const xHex = this.base64ToHex(x);
        const yHex = this.base64ToHex(y);
        return "0x" + xHex + yHex;
    }

    static getXandYFromPublicKey(publicKey: string): [string, string] {
        const sliced = publicKey.startsWith("0x")
            ? publicKey.slice(2)
            : publicKey;

        const x = sliced.slice(0, 64);
        const y = sliced.slice(64, 128);
        return [formatHex(x), formatHex(y)];
    }

    static base64toBase64Url(base64: string): string {
        return base64
            .replaceAll("+", "-")
            .replaceAll("/", "_")
            .replaceAll("=", "");
    }

    static async getKey(pubkey: ArrayBufferLike): Promise<CryptoKey> {
        const algoParams = {
            name: "ECDSA",
            namedCurve: "P-256",
            hash: "SHA-256",
        };

        const response = await crypto.subtle.importKey(
            "spki",
            pubkey,
            algoParams,
            true,
            ["verify"],
        );
        return response;
    }

    static bufferToHex(buffer: Buffer): string {
        return buffer.toString("hex");
    }

    static base64UrlToBase64(base64url: string | Buffer): string {
        base64url = base64url.toString();
        return this.padString(base64url).replace(/\-/g, "+").replace(/_/g, "/");
    }

    static bufferFromBase64url(base64url: string): Buffer {
        return Buffer.from(this.base64UrlToBase64(base64url), "base64");
    }

    static padString(input: string): string {
        const segmentLength = 4;
        const stringLength = input.length;
        const diff = stringLength % segmentLength;

        if (!diff) {
            return input;
        }

        let position = stringLength;
        let padLength = segmentLength - diff;
        const paddedStringLength = stringLength + padLength;
        const buffer = Buffer.alloc(paddedStringLength);

        buffer.write(input);

        while (padLength--) {
            buffer.write("=", position++);
        }

        return buffer.toString();
    }
}
