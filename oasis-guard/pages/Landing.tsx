import { useMutation } from "@tanstack/react-query";
import { css, StyleSheet } from "aphrodite";
import LandingImage from "data-base64:~assets/landing.png";
import LogoWithSubtext from "data-base64:~assets/logoWithSubtext.png";
import type { ReactNode } from "react";

import {
    OasisGuardFactoryController,
    OasisGuardPasskeyController,
} from "~controllers";
import { Button, Gap } from "~ui";

export const Landing = (): ReactNode => {
    const registerMutation = useMutation({
        mutationFn: async () => {
            const registrationEncoded =
                await OasisGuardPasskeyController.register();
            const publicKeyBase64Url = registrationEncoded.credential.publicKey;
            const publicKey =
                await OasisGuardPasskeyController.getPublicKeyFromPublicKeyCose(
                    publicKeyBase64Url,
                );
            const xAndY =
                OasisGuardPasskeyController.getXandYFromPublicKey(publicKey);

            const accountReceipt =
                await OasisGuardFactoryController.genCreateAccount(xAndY);

            console.log("AccountReceipt", accountReceipt);

            if (accountReceipt != null) {
                console.log(
                    await OasisGuardFactoryController.genAccountAddress(xAndY),
                );
            }
        },
    });

    return (
        <div className={css(styles.page)}>
            <img src={LandingImage} className={css(styles.image)} />
            <div className={css(styles.actions)}>
                <img src={LogoWithSubtext} className={css(styles.logo)} />
                <Button onClick={registerMutation.mutateAsync} color="black">
                    Sign Up With Passkeys
                </Button>
                <Gap size={12} />
                <Button
                    onClick={async () => {
                        const authResponse =
                            await OasisGuardPasskeyController.auth();
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
    logo: {
        pointerEvents: "none",
        userSelect: "none",
        width: 185,
        marginBottom: 50,
    },
    actions: {
        width: "100%",
        marginTop: "auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 1,
    },
    image: {
        height: 363,
        width: 347,
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
                transform: "scale(1.1)",
            },
            "50%": {
                transform: "scale(1.15)",
            },
            "75%": {
                transform: "scale(1.1)",
            },
            "100%": {
                transform: "scale(1)",
            },
        },
        animationIterationCount: "infinite",
        animationDuration: "10s",
        animationTimingFunction: "linear",
    },
});
