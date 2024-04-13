import { css, StyleSheet } from "aphrodite";
import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";

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
    const [hovered, setHovered] = useState(false);

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
            className={css(
                styles.wrapper,
                hovered ? styles.hovered : null,
                ...styleOverrides,
            )}
            style={{
                height,
                ...getColorStyles(),
            }}
            onMouseEnter={(e) => {
                props.onMouseEnter?.(e);
                setHovered(true);
            }}
            onMouseLeave={(e) => {
                props.onMouseLeave?.(e);
                setHovered(false);
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
    hovered: {
        opacity: 0.95,
        transform: "scale(1.01)",
        transition: "all 0.2s ease-in-out",
    },
    wrapper: {
        width: "100%",
        display: "flex",
        fontFamily: "Roboto, sans-serif",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
        cursor: "pointer",
        outline: "none",
        borderStyle: "inset",
        transition: "all 0.2s ease-in-out",
        zIndex: 1,
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
