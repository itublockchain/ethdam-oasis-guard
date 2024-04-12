import { css, StyleSheet } from "aphrodite";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface Props extends ComponentPropsWithoutRef<"button"> {
    textProps?: ComponentPropsWithoutRef<"span">;
    textStyleOverrides?: object[];
    styleOverrides?: object[];
    leftEl?: ReactNode;
    rightEl?: ReactNode;
    height?: number;
    onClick?: () => void;
}

export const Button = ({
    textProps,
    textStyleOverrides = [],
    styleOverrides = [],
    leftEl,
    rightEl,
    height = 48,
    children,
    onClick,
    ...props
}: Props): ReactNode => {
    return (
        <button
            {...props}
            onClick={onClick}
            className={css(styles.wrapper, ...styleOverrides)}
            style={{
                height,
            }}
        >
            {leftEl != null && leftEl}
            <span
                {...props}
                className={css(styles.text, ...textStyleOverrides)}
            >
                {children}
            </span>
            {rightEl != null && rightEl}
        </button>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        display: "flex",
        fontFamily: "Roboto, sans-serif",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        cursor: "pointer",
        outline: "none",
    },
    text: {
        width: "100%",
        outline: "none",
        border: "none",
        fontSize: 15,
        fontFamily: "Roboto, sans-serif",
        fontWeight: 400,
    },
});
