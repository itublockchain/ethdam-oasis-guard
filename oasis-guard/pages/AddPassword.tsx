import { css, StyleSheet } from "aphrodite";
import type { ReactNode } from "react";

import { Navbar } from "~components";
import { Button, Gap, Input } from "~ui";
import { Paths, useNavigation } from "~utils";

export const AddPassword = (): ReactNode => {
    const navigation = useNavigation();

    return (
        <div className={css(styles.page)}>
            <Navbar hasBackButton={navigation.canGoBack()} />
            <div className={css(styles.container)}>
                <div className={css(styles.main)}>
                    <Input label="Website" />
                    <Gap size={16} />
                    <Input label="Password" />
                    <Button styleOverrides={[styles.randomButton]}>
                        Generate a Secure Password
                    </Button>
                </div>
                <Button color="black" styleOverrides={[styles.saveButton]}>
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
