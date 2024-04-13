import { css, StyleSheet } from "aphrodite";
import { UserSquare } from "iconsax-react";
import { useState, type ReactNode } from "react";

import { Navbar } from "~components";
import { OasisGuardStorageController } from "~controllers";
import { useSetUserStore, useUserStore } from "~store";
import { Button, Typography } from "~ui";
import { Paths, useNavigation } from "~utils";

export const Settings = (): ReactNode => {
    const setUserStore = useSetUserStore();
    const userStore = useUserStore();
    const navigation = useNavigation();
    const [copied, setCopied] = useState(false);
    const logout = async () => {
        await new Promise((resolve) => {
            OasisGuardStorageController.clearUserStore();
            resolve(true);
        });

        setUserStore(null);
        navigation.replace(Paths.LANDING);
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const copyAddress = async () => {
        await navigator.clipboard.writeText(userStore.publicAddress);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className={css(styles.page)}>
            <Navbar hasBackButton={navigation.canGoBack()} />

            <div className={css(styles.container)}>
                <div className={css(styles.address)}>
                    <div style={{ flexShrink: 0 }}>
                        <UserSquare size={30} color="white" />
                    </div>
                    <Typography
                        fontSize={16}
                        styleOverrides={[styles.addressText]}
                    >
                        {formatAddress(userStore.publicAddress)}
                    </Typography>
                    <Button onClick={copyAddress} height={40}>
                        {copied ? "Copied" : "Copy"}
                    </Button>
                </div>

                <Button
                    styleOverrides={[styles.logout]}
                    color="danger"
                    onClick={logout}
                >
                    Logout
                </Button>
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
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 16,
    },
    address: {
        marginBottom: 24,
        alignItems: "center",
        display: "flex",
        gap: 8,
    },
    logout: {
        marginTop: "auto",
    },
    addressText: {
        display: "flex",
        alignItems: "center",
    },
});
