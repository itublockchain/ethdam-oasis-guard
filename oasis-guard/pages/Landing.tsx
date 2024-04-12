import { css, StyleSheet } from "aphrodite";
import LandingImage from "data-base64:~assets/landing.png";
import type { ReactNode } from "react";

import { Button, Typography } from "~ui";

export const Landing = (): ReactNode => {
    return (
        <div className={css(styles.page)}>
            <img src={LandingImage} className={css(styles.image)} />
            <div className={css(styles.actions)}>
                <Button>Sign Up With Passkeys</Button>
                <Button>Sign In With Passkeys</Button>
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    page: {
        height: "100%",
        display: "flex",
        paddingBottom: 72,
        paddingLeft: 64,
        paddingRight: 64,
    },
    actions: {
        width: "100%",
        marginTop: "auto",
        flexDirection: "column",
    },
    image: {
        height: 483,
        width: 462,
        position: "absolute",
        pointerEvents: "none",
        top: 0,
        right: -80,
    },
});
