import { css, StyleSheet } from "aphrodite";
import { Add } from "iconsax-react";
import type { ReactNode } from "react";

import { Navbar } from "~components";
import { Button } from "~ui";
import { Paths, useNavigation, usePasswordNames } from "~utils";

export const Home = (): ReactNode => {
    const navigation = useNavigation();
    const { data: passwordNames } = usePasswordNames();

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
            <div className={css(styles.passwords)}>
                {passwordNames.map((name) => {
                    return (
                        <div className={css(styles.passwordWrapper)}>
                            {name}
                        </div>
                    );
                })}
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
    passwords: {
        paddingLeft: 16,
        paddingRight: 16,
        display: "flex",
        flexDirection: "column",
    },
    passwordWrapper: {
        display: "flex",
    },
});
