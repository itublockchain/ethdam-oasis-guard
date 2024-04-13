export const formatHex = (hex: string): string => {
    return hex.startsWith("0x") ? hex : "0x" + hex;
};

export const parseHex = (hex: string): string => {
    return hex.startsWith("0x") ? hex.slice(2) : hex;
};
