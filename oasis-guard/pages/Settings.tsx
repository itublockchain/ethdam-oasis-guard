import { css, StyleSheet } from "aphrodite";
import type { ReactNode } from "react";

import { Navbar } from "~components";
import { OasisGuardStorageController } from "~controllers";
import { useSetUserStore, useUserStore } from "~store";
import { Button, Typography } from "~ui";
import { Paths, useNavigation } from "~utils";

export const Settings = (): ReactNode => {
    const setUserStore = useSetUserStore();
    const userStore = useUserStore();
    const navigation = useNavigation();
    const logout = async () => {
        await new Promise((resolve) => {
            OasisGuardStorageController.clearUserStore();
            resolve(true);
        });

        setUserStore(null);
        navigation.replace(Paths.LANDING);
    };

    return (
        <div className={css(styles.page)}>
            <Navbar hasBackButton={navigation.canGoBack()} />

            <div className={css(styles.container)}>
                <Typography>{userStore.publicAddress}</Typography>
                <Button onClick={logout}>Logout</Button>
            </div>
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
        padding: 16,
    },
});
