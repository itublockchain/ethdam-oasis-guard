import { css, StyleSheet } from "aphrodite";
import type { ReactNode } from "react";

import { Navbar } from "~components";

export const Home = (): ReactNode => {
    const passwords = [];

    return (
        <div className={css(styles.page)}>
            <Navbar />
        </div>
    );
};

const styles = StyleSheet.create({
    page: {
        display: "flex",
        flexDirection: "column",
    },
});
