import { css, StyleSheet } from "aphrodite";
import { Add } from "iconsax-react";
import type { ReactNode } from "react";

import { Navbar } from "~components";
import { Button } from "~ui";
import { Paths, useNavigation, usePasswordNames } from "~utils";

export const Home = (): ReactNode => {
    const navigation = useNavigation();

    return (
        <div className={css(styles.page)}>
            <Navbar />
            <div className={css(styles.floating)}>
                <Button
                    onClick={() => {
                        navigation.push(Paths.ADD_PASSWORD);
                    }}
                    styleOverrides={[styles.circle]}
                >
                    <Add />
                </Button>
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    page: {
        display: "flex",
        flexDirection: "column",
    },
    floating: {
        position: "absolute",
        right: 16,
        bottom: 16,
    },
    circle: {
        width: 48,
        height: 48,
        borderRadius: 48,
    },
});
