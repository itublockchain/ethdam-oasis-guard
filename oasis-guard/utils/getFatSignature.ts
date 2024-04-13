import type { AuthenticationEncoded } from "@passwordless-id/webauthn/dist/esm/types";
import { ethers, type BigNumber } from "ethers";

import { OasisGuardPasskeyController } from "~controllers";

export const getFatSignature = (encoded: AuthenticationEncoded) => {
    const authenticatorDataBuffer = Buffer.from(
        OasisGuardPasskeyController.base64UrlToBase64(
            encoded.authenticatorData,
        ),
        "base64",
    );

    const clientDataBuffer = Buffer.from(
        OasisGuardPasskeyController.base64UrlToBase64(encoded.clientData),
        "base64",
    );

    const rs = getRS(encoded.signature);

    return encodeSignature(authenticatorDataBuffer, clientDataBuffer, rs);
};

const encodeSignature = (
    authenticatorData: Buffer,
    clientData: Buffer,
    rs: BigNumber[],
): string => {
    const prefix = Buffer.from('{"type":"webauthn.get","challenge":"', "utf8");

    let clientDataSuffix = clientData.slice(prefix.length).toString();
    const quoteIndex = clientDataSuffix.indexOf('"');
    clientDataSuffix = clientDataSuffix.slice(quoteIndex);

    return ethers.utils.defaultAbiCoder.encode(
        ["bytes", "string", "bytes32[2]"],
        [authenticatorData, clientDataSuffix, rs],
    );
};

export function getRS(_signatureBase64: string): Array<ethers.BigNumber> {
    const signatureBuffer =
        OasisGuardPasskeyController.bufferFromBase64url(_signatureBase64);
    const signatureParsed = derToRS(signatureBuffer);

    const sig: Array<ethers.BigNumber> = [
        ethers.BigNumber.from(bufferToHex(signatureParsed[0])),
        ethers.BigNumber.from(bufferToHex(signatureParsed[1])),
    ];

    return sig;
}

export function derToRS(der: Buffer): Array<Buffer> {
    let offset = 3;
    let dataOffset: number;

    if (der[offset] == 0x21) {
        dataOffset = offset + 2;
    } else {
        dataOffset = offset + 1;
    }
    const r = der.slice(dataOffset, dataOffset + 32);
    offset = offset + der[offset] + 1 + 1;
    if (der[offset] == 0x21) {
        dataOffset = offset + 2;
    } else {
        dataOffset = offset + 1;
    }
    const s = der.slice(dataOffset, dataOffset + 32);
    return [r, s];
}

export function bufferToHex(buffer: ArrayBufferLike): string {
    return "0x".concat(
        [...new Uint8Array(buffer)]
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(""),
    );
}
