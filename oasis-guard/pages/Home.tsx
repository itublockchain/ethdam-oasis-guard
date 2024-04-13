import { css, StyleSheet } from "aphrodite";
import DefaultImage from "data-base64:~assets/default-password.png";
import { Add, ArrowDown2, ArrowRight2, Eye } from "iconsax-react";
import type { ReactNode } from "react";

import { Navbar } from "~components";
import { Button, Typography } from "~ui";
import { Dimensions, Paths, useNavigation, usePasswordNames } from "~utils";

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
                    return <PasswordView key={name} name={name} />;
                })}
            </div>
        </div>
    );
};

function PasswordView({ name }: { name: string }): ReactNode {
    const getPasswordNameIcon = () => {
        return DefaultImage;
    };

    return (
        <div key={name} className={css(styles.passwordWrapper)}>
            <img className={css(styles.image)} src={getPasswordNameIcon()} />
            <div className={css(styles.meta)}>
                <Typography styleOverrides={[styles.password]} fontSize={14}>
                    {name}
                </Typography>
                <Typography fontSize={10} styleOverrides={[styles.mask]}>
                    Password: *******
                </Typography>
            </div>
            <div className={css(styles.actions)}>
                <div className={css(styles.eye)}>
                    <Eye size={20} color="white" />
                </div>
                <div className={css(styles.arrow)}>
                    <ArrowRight2 size={20} color="white" />
                </div>
            </div>
        </div>
    );
}

const styles = StyleSheet.create({
    page: {
        display: "flex",
        flexDirection: "column",
    },
    floating: {
        position: "fixed",
        right: 16,
        bottom: 16,
    },
    circle: {
        width: 48,
        height: 48,
        borderRadius: 48,
        opacity: 0.7,
    },
    passwords: {
        paddingLeft: 16,
        paddingRight: 16,
        display: "flex",
        flexDirection: "column",
    },
    passwordWrapper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        paddingBottom: 12,
        paddingTop: 12,
        borderBottom: "1px solid #121212",
    },
    meta: {
        display: "flex",
        flexDirection: "column",
        maxWidth: Dimensions.width / 2,
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 48,
        marginRight: 16,
    },
    mask: {
        marginTop: 6,
        color: "gray",
    },
    actions: {
        marginLeft: "auto",
        display: "flex",
    },
    eye: {
        marginRight: 12,
        cursor: "pointer",
    },
    arrow: {
        cursor: "pointer",
    },
    password: {
        textOverflow: "ellipsis",
        overflow: "hidden",
    },
});
