import { css, StyleSheet } from "aphrodite";
import type { ReactNode } from "react";

import { Dimensions } from "~utils";

type Props = {
    children: ReactNode;
};

export const AppWrapper = ({ children }: Props): ReactNode => {
    return <div className={css(styles.wrapper)}>{children}</div>;
};

//eslint-disable-next-line
const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        backgroundColor: "black",
        padding: 0,
        margin: 0,
        flexDirection: "column",
        width: Dimensions.width,
        height: Dimensions.heigth,
        marginLeft: "auto",
        marginRight: "auto",
    },
});
