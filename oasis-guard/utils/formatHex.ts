export const formatHex = (hex: string): string => {
    return hex.startsWith("0x") ? hex : "0x" + hex;
};
