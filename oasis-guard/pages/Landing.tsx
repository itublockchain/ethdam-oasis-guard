import { useMutation } from "@tanstack/react-query";
import { css, StyleSheet } from "aphrodite";
import AnimationVideo from "data-base64:~assets/animation.mp4";
import LandingImage from "data-base64:~assets/landing.png";
import LogoWithSubtext from "data-base64:~assets/logoWithSubtext.png";
import { ethers } from "ethers";
import { useEffect, type ReactNode } from "react";

import {
    OasisGuardFactoryController,
    OasisGuardPasskeyController,
    OasisGuardStorageController,
} from "~controllers";
import { useSetUserStore, type User } from "~store";
import { Button, Gap } from "~ui";
import { formatHex, Paths, useNavigation } from "~utils";

export const Landing = (): ReactNode => {
    const setUserStore = useSetUserStore();
    const navigation = useNavigation();

    const navigateAndSetUserStore = async (user: User) => {
        setUserStore(user);
        OasisGuardStorageController.setUserStore(user);
        navigation.push(Paths.HOME);
    };

    const registerMutation = useMutation({
        mutationFn: async () => {
            const userId = formatHex(
                Buffer.from(ethers.utils.randomBytes(8)).toString("hex"),
            );
            const registrationEncoded =
                await OasisGuardPasskeyController.register(userId);
            const publicKeyBase64Url = registrationEncoded.credential.publicKey;
            const publicKey =
                await OasisGuardPasskeyController.getPublicKeyFromPublicKeyCose(
                    publicKeyBase64Url,
                );
            const xAndY =
                OasisGuardPasskeyController.getXandYFromPublicKey(publicKey);

            const accountReceipt =
                await OasisGuardFactoryController.genCreateAccount(
                    xAndY,
                    userId,
                );

            if (accountReceipt != null) {
                console.log(
                    await OasisGuardFactoryController.genAccountAddress(xAndY),
                );
            }
        },
    });

    const authMutation = useMutation({
        mutationFn: async () => {
            const authResponse = await OasisGuardPasskeyController.auth();
            const userId = OasisGuardPasskeyController.base64UrlToUtf8(
                authResponse.userHandle,
            );

            const publicKey =
                await OasisGuardFactoryController.getPublicKey(userId);
            const publicAddress =
                await OasisGuardFactoryController.genAccountAddress(publicKey);

            const user = {
                credentialId: authResponse.credentialId,
                publicKey,
                publicAddress,
                userId,
            };
            navigateAndSetUserStore(user);
        },
    });

    useEffect(() => {
        const userStore = OasisGuardStorageController.getUserStore();
        if (userStore != null) {
            navigateAndSetUserStore(userStore);
        }
    }, []);

    return (
        <div className={css(styles.page)}>
            <img src={LandingImage} className={css(styles.image)} />
            <video loop autoPlay className={css(styles.video)}>
                <source src={AnimationVideo} type="video/mp4" />
            </video>
            <div className={css(styles.actions)}>
                <img src={LogoWithSubtext} className={css(styles.logo)} />

                <Button
                    isLoading={registerMutation.isPending}
                    onClick={registerMutation.mutateAsync}
                    color="black"
                >
                    Sign Up With Passkeys
                </Button>
                <Gap size={12} />
                <Button
                    isLoading={authMutation.isPending}
                    onClick={async () => {
                        await authMutation.mutateAsync();
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
    video: {
        height: 400,
        width: 400,
        position: "absolute",
        pointerEvents: "none",
        top: -100,
        right: -100,
        zIndex: 0,

        animationName: {
            "0%": {
                transform: "scale(1.05) rotate(-138deg)",
            },
            "25%": {
                transform: "scale(1.1) rotate(-138deg)",
            },
            "50%": {
                transform: "scale(1.15) rotate(-138deg)",
            },
            "75%": {
                transform: "scale(1.1) rotate(-138deg)",
            },
            "100%": {
                transform: "scale(1.05) rotate(-138deg)",
            },
        },
        animationIterationCount: "infinite",
        animationDuration: "10s",
        animationTimingFunction: "linear",
    },
    image: {
        height: 470,
        position: "absolute",
        pointerEvents: "none",
        right: -105,
        top: -110,
        zIndex: 1,
        animationName: {
            "0%": {
                transform: "scale(1.05)",
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
                transform: "scale(1.05)",
            },
        },
        animationIterationCount: "infinite",
        animationDuration: "10s",
        animationTimingFunction: "linear",
    },
});
