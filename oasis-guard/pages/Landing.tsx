import { css, StyleSheet } from "aphrodite";
import LandingImage from "data-base64:~assets/landing.png";
import type { ReactNode } from "react";

import { OasisGuardPasskeyController } from "~controllers";
import { Button, Gap } from "~ui";

export const Landing = (): ReactNode => {
    return (
        <div className={css(styles.page)}>
            <img
                src={LandingImage}
                style={{
                    animationTimingFunction: "linear",
                }}
                className={css(styles.image)}
            />
            <div className={css(styles.actions)}>
                <Button
                    onClick={async () => {
                        const registrationEncoded =
                            await OasisGuardPasskeyController.register();
                        const publicKeyBase64Url =
                            registrationEncoded.credential.publicKey;
                        const publicKey =
                            await OasisGuardPasskeyController.getPublicKeyFromPublicKeyCose(
                                publicKeyBase64Url,
                            );
                    }}
                    color="black"
                >
                    Sign Up With Passkeys
                </Button>
                <Gap size={12} />
                <Button
                    onClick={async () => {
                        const authResponse =
                            await OasisGuardPasskeyController.auth();
                        console.log(authResponse);
                    }}
                >
                    Sign In With Passkeys
                </Button>
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
        zIndex: 1,
    },
    image: {
        height: 483,
        width: 462,
        position: "absolute",
        pointerEvents: "none",
        top: 0,
        right: -80,
        zIndex: 0,
        animationName: {
            "0%": {
                transform: "scale(1)",
            },
            "25%": {
                transform: "scale(1.025)",
            },
            "50%": {
                transform: "scale(1.05)",
            },
            "75%": {
                transform: "scale(1.025)",
            },
            "100%": {
                transform: "scale(1)",
            },
        },
        animationIterationCount: "infinite",
        animationDuration: "7.5s",
    },
});
