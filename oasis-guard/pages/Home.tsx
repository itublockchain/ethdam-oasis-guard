import { css, StyleSheet } from "aphrodite";
import type { ReactNode } from "react";

import { Navbar } from "~components";

export const Home = (): ReactNode => {
    return (
        <div className={css(styles.page)}>
            <Navbar />
        </div>
    );
};

const styles = StyleSheet.create({
    page: {
        height: "100%",
        display: "flex",
    },
});
