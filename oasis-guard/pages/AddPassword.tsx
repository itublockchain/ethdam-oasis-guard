import { css, StyleSheet } from "aphrodite";
import { useState, type ReactNode } from "react";

import { Navbar } from "~components";
import { OasisGuardPasswordController } from "~controllers";
import { useUserStore } from "~store";
import { Button, Gap, Input } from "~ui";
import { useNavigation } from "~utils";

export const AddPassword = (): ReactNode => {
    const userStore = useUserStore();
    const navigation = useNavigation();
    const [website, setWebsite] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={css(styles.page)}>
            <Navbar hasBackButton={navigation.canGoBack()} />
            <div className={css(styles.container)}>
                <div className={css(styles.main)}>
                    <Input
                        value={website}
                        onChange={(e) => {
                            setWebsite(e.target.value);
                        }}
                        label="Website"
                    />
                    <Gap size={16} />
                    <Input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        label="Password"
                    />
                    <Button styleOverrides={[styles.randomButton]}>
                        Generate a Secure Password
                    </Button>
                </div>
                <Button
                    onClick={async () => {
                        OasisGuardPasswordController.addPassword(
                            userStore.credentialId,
                            userStore.publicAddress,
                            website,
                            password,
                        );
                    }}
                    color="black"
                    styleOverrides={[styles.saveButton]}
                >
                    Save
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
        padding: 16,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    main: {
        display: "flex",
        flexDirection: "column",
    },
    randomButton: {
        marginTop: 12,
    },
    saveButton: {
        marginTop: "auto",
    },
});
