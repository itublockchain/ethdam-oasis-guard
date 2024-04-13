import { css, StyleSheet } from "aphrodite";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Typography } from "~ui/Typography";

interface Props extends ComponentPropsWithoutRef<"input"> {
    containerProps?: ComponentPropsWithoutRef<"div">;
    styleOverrides?: object[];
    containerStyleOverrides?: object[];
    label?: string;
    error?: string;
    warning?: string;
}

export const Input = ({
    containerProps = {},
    containerStyleOverrides = [],
    styleOverrides = [],
    label,
    error,
    warning,
    ...props
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
            <input
                {...props}
                className={css(styles.input, ...styleOverrides)}
            />
            {error && (
                <Typography fontSize={14} styleOverrides={[styles.error]}>
                    {error}
                </Typography>
            )}
            {warning && (
                <Typography fontSize={14} styleOverrides={[styles.warning]}>
                    {warning}
                </Typography>
            )}
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
    error: {
        color: "red",
        marginTop: 8,
    },
    warning: {
        color: "orange",
        marginTop: 8,
    },
});
