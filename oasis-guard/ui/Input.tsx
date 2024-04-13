import { css, StyleSheet } from "aphrodite";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Typography } from "~ui/Typography";

interface Props extends ComponentPropsWithoutRef<"input"> {
    containerProps?: ComponentPropsWithoutRef<"div">;
    styleOverrides?: object[];
    containerStyleOverrides?: object[];
    label?: string;
}

export const Input = ({
    containerProps = {},
    containerStyleOverrides = [],
    styleOverrides = [],
    label,
}: Props): ReactNode => {
    return (
        <div
            className={css(styles.container, ...containerStyleOverrides)}
            {...containerProps}
        >
            {label && (
                <Typography fontSize={14} styleOverrides={[styles.label]}>
                    {label}
                </Typography>
            )}
            <input className={css(styles.input, ...styleOverrides)} />
        </div>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        width: "100%",
        height: 48,
        borderRadius: 8,
        border: "1px solid #575757",
        padding: 16,
        boxSizing: "border-box",
        backgroundColor: "black",
        color: "white",
        fontFamily: "Roboto, sans-serif",
        fontSize: 16,
    },
    label: {
        marginBottom: 8,
    },
});
