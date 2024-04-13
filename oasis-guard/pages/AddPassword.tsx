import { css, StyleSheet } from "aphrodite";
import type { ReactNode } from "react";

import { Navbar } from "~components";
import { Paths, useNavigation } from "~utils";

export const AddPassword = (): ReactNode => {
    const navigation = useNavigation();

    return (
        <div className={css(styles.page)}>
            <Navbar hasBackButton={navigation.canGoBack()} />
            <div className={css(styles.container)}></div>
        </div>
    );
};

const styles = StyleSheet.create({
    page: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    container: {
        paddingLeft: 16,
        paddingRight: 16,
    },
});
