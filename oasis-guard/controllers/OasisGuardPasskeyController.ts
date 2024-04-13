import { Buffer } from "buffer";
import { BigNumber, ethers } from "ethers";

import { authenticate, register } from "~utils";

export class OasisGuardPasskeyController {
    static getDisplayName(): string {
        const readableDate = this.getCurrentDateReadable();
        return "Wallet Created at " + readableDate;
    }

    static getCurrentDateReadable(): string {
        const currentDate = new Date();

        const day =
            currentDate.getDate() < 10
                ? `0${currentDate.getDate()}`
                : currentDate.getDate().toString();
        const month = this.getMonthFromIndex(currentDate.getMonth());
        const year = currentDate.getFullYear().toString();
        return `${month} ${day}, ${year} - ${
            currentDate.getHours().toString().length > 1
                ? currentDate.getHours()
                : "0" + currentDate.getHours().toString()
        }:${
            currentDate.getMinutes().toString().length > 1
                ? currentDate.getMinutes()
                : "0" + currentDate.getMinutes().toString()
        }`;
    }

    static getMonthFromIndex(index: number) {
        const indexToMonth: Record<number, string> = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "Jun",
            6: "Jul",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec",
        };
        return indexToMonth[index];
    }

    // public static authenticate() {}

    static async register() {
        const CHALLENGE = "deadbeefdeafbeef";
        return await register(
            OasisGuardPasskeyController.getCurrentDateReadable(),
            "OasisGuard",
            CHALLENGE,
        );
    }

    static async auth() {
        const CHALLENGE = "deadbeefdeafbeef";
        return await authenticate([], CHALLENGE);
    }

    static base64ToHex(base64: string): string {
        return Buffer.from(base64, "base64").toString("hex");
    }

    static base64UrlToUtf8(base64Url: string): string {
        return Buffer.from(base64Url, "base64").toString("hex");
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
        return [x, y];
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
}
