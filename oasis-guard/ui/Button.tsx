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
    color?: "black" | "white";
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
    color = "white",
    ...props
}: Props): ReactNode => {
    const getColorStyles = () => {
        if (color === "black") {
            return {
                backgroundColor: "black",
                borderColor: "white",
                borderWidth: 1,
            };
        } else if (color === "white") {
            return {
                backgroundColor: "white",
                borderColor: "white",
                borderWidth: 1,
            };
        }
    };

    const getTextStyles = () => {
        if (color === "black") {
            return {
                color: "white",
            };
        } else if (color === "white") {
            return {
                color: "black",
            };
        }
    };

    return (
        <button
            {...props}
            onClick={onClick}
            className={css(styles.wrapper, ...styleOverrides)}
            style={{
                height,
                ...getColorStyles(),
            }}
        >
            {leftEl != null && leftEl}
            <span
                {...props}
                style={{ ...getTextStyles() }}
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
