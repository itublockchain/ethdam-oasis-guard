import { useMutation } from "@tanstack/react-query";
import { css, StyleSheet } from "aphrodite";
import { useMemo, useState, type ReactNode } from "react";

import { Navbar } from "~components";
import { OasisGuardPasswordController } from "~controllers";
import { useUserStore } from "~store";
import { Button, Gap, Input } from "~ui";
import { Queries, queryClient, useNavigation, usePasswordNames } from "~utils";

export const AddPassword = (): ReactNode => {
    const userStore = useUserStore();
    const navigation = useNavigation();
    const [website, setWebsite] = useState("");
    const [password, setPassword] = useState("");
    const { data: passwordNames } = usePasswordNames();
    const [startedWriting, setStartedWriting] = useState(false);

    const isNameTaken = useMemo(() => {
        return passwordNames.includes(website);
    }, [passwordNames, website]);

    const isPasswordSecure = useMemo(() => {
        return password.length >= 8;
    }, [password]);

    const isSaveDisabled = useMemo(() => {
        if (website.trim() === "" || password.trim() === "" || isNameTaken) {
            return true;
        }
    }, [isNameTaken, website, password]);

    const addPasswordMutation = useMutation({
        mutationFn: async () => {
            await OasisGuardPasswordController.addPassword(
                userStore.credentialId,
                userStore.publicAddress,
                password,
                website,
            );
            navigation.pop();
            queryClient.refetchQueries({
                queryKey: [Queries.NAMES],
            });
        },
    });

    return (
        <div className={css(styles.page)}>
            <Navbar hasBackButton={navigation.canGoBack()} />
            <div className={css(styles.container)}>
                <div className={css(styles.main)}>
                    <Input
                        error={
                            isNameTaken ? "Name is already taken" : undefined
                        }
                        value={website}
                        onChange={(e) => {
                            setWebsite(e.target.value);
                        }}
                        label="Website"
                    />
                    <Gap size={16} />
                    <Input
                        warning={
                            !isPasswordSecure && startedWriting
                                ? "Password must be at least 8 characters"
                                : undefined
                        }
                        value={password}
                        onChange={(e) => {
                            setStartedWriting(true);
                            setPassword(e.target.value);
                        }}
                        label="Password"
                    />
                    <Button
                        onClick={() => {
                            setPassword(
                                OasisGuardPasswordController.generateRandomPassword(),
                            );
                        }}
                        styleOverrides={[styles.randomButton]}
                    >
                        Generate a Secure Password
                    </Button>
                </div>
                <Button
                    disabled={isSaveDisabled}
                    onClick={async () => {
                        addPasswordMutation.mutateAsync();
                    }}
                    isLoading={addPasswordMutation.isPending}
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
