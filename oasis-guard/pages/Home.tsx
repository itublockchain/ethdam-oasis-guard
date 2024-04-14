import { useMutation } from "@tanstack/react-query";
import { css, StyleSheet } from "aphrodite";
import AnimationVideo from "data-base64:~assets/animation.mp4";
import DefaultImage from "data-base64:~assets/default-password.png";
import Argent from "data-base64:~assets/logos/argent.png";
import Binance from "data-base64:~assets/logos/binance.png";
import Github from "data-base64:~assets/logos/github.png";
import GoogleImage from "data-base64:~assets/logos/google.png";
import Metamask from "data-base64:~assets/logos/metamask.png";
import Rabby from "data-base64:~assets/logos/rabby.png";
import Rainbow from "data-base64:~assets/logos/rainbow.png";
import X from "data-base64:~assets/logos/x.png";
import Zerion from "data-base64:~assets/logos/zerion.png";
import { ethers } from "ethers";
import {
    Add,
    ArrowDown2,
    ArrowRight2,
    ChartCircle,
    Copy,
    Eye,
    EyeSlash,
    ImportSquare,
    Share,
    Trash,
} from "iconsax-react";
import Papa from "papaparse";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Navbar } from "~components";
import { OasisGuardPasswordController } from "~controllers";
import { useUserStore } from "~store";
import { Button, Typography } from "~ui";
import {
    Dimensions,
    Paths,
    Queries,
    queryClient,
    useNavigation,
    usePasswordNames,
} from "~utils";

type ImportData = {
    name: string;
    password: string;
    url?: string;
};

export const Home = (): ReactNode => {
    const navigation = useNavigation();
    const { data: passwordNames, isLoading } = usePasswordNames();
    const inputRef = useRef(null);
    const [file, setFile] = useState<File | null>(null);
    const userStore = useUserStore();
    const [readyToImportData, setReadyToImportData] =
        useState<Array<ImportData> | null>(null);

    const hasNoPasswords = passwordNames.length === 0;

    const addPasswordsMutation = useMutation({
        mutationFn: async (data: Array<ImportData>) => {
            const formatUrl = (url: string) => url?.replace("https://", "");
            const names = data.map((item) => item.name ?? formatUrl(item.url));

            const passwords = data.map((item) =>
                OasisGuardPasswordController.formatPassword(item.password),
            );

            await OasisGuardPasswordController.addPasswords(
                userStore.credentialId,
                userStore.publicAddress,
                passwords,
                names,
            );
            queryClient.refetchQueries({
                queryKey: [Queries.NAMES],
            });
        },
    });

    useEffect(() => {
        try {
            const imported = localStorage.getItem("IMPORT");
            if (imported) {
                setReadyToImportData(JSON.parse(imported));
            }
        } catch {
            localStorage.removeItem("IMPORT");
        }
    }, []);

    return (
        <div className={css(styles.page)}>
            <Navbar />
            <div className={css(styles.floating)}>
                {!hasNoPasswords && (
                    <Button
                        onClick={() => {
                            navigation.push(Paths.ADD_PASSWORD);
                        }}
                        styleOverrides={[styles.circle]}
                    >
                        <Add />
                    </Button>
                )}
            </div>
            <div className={css(styles.passwords)}>
                {!isLoading ? (
                    <>
                        {hasNoPasswords && (
                            <>
                                <video
                                    loop
                                    autoPlay
                                    className={css(styles.video)}
                                >
                                    <source
                                        src={AnimationVideo}
                                        type="video/mp4"
                                    />
                                </video>
                                <Button
                                    onClick={() => {
                                        navigation.push(Paths.ADD_PASSWORD);
                                    }}
                                >
                                    Get Started
                                </Button>
                                <input
                                    onChange={(e) => {
                                        const _file = e.target.files[0];
                                        setFile(_file);
                                        Papa.parse(_file, {
                                            header: true,
                                            skipEmptyLines: true,
                                            complete: async function (results: {
                                                data: Array<ImportData>;
                                            }) {
                                                localStorage.setItem(
                                                    "IMPORT",
                                                    JSON.stringify(
                                                        results.data,
                                                    ),
                                                );
                                            },
                                        });
                                    }}
                                    value={file?.name}
                                    ref={inputRef}
                                    type="file"
                                    style={{ display: "none" }}
                                />
                                <Button
                                    isLoading={addPasswordsMutation.isPending}
                                    onClick={() => {
                                        if (readyToImportData != null) {
                                            localStorage.removeItem("IMPORT");
                                            addPasswordsMutation.mutateAsync(
                                                readyToImportData,
                                            );
                                            setReadyToImportData(null);
                                        } else {
                                            inputRef.current.click();
                                        }
                                    }}
                                    color="black"
                                    leftEl={<ImportSquare color="white" />}
                                    styleOverrides={[styles.import]}
                                >
                                    {addPasswordsMutation.isPending
                                        ? "Importing"
                                        : readyToImportData
                                          ? "Start Import"
                                          : "Import With File"}
                                </Button>
                            </>
                        )}
                        {passwordNames.map((name) => {
                            return <PasswordView key={name} name={name} />;
                        })}
                    </>
                ) : (
                    <div className={css(styles.spinner)}>
                        <ChartCircle size={32} color="white" />
                    </div>
                )}
            </div>
        </div>
    );
};

function PasswordView({ name }: { name: string }): ReactNode {
    const [expanded, setExpanded] = useState(false);
    const [resolvedPassword, setResolvedPassword] = useState<string | null>(
        null,
    );
    const [copied, setCopied] = useState(false);
    const userStore = useUserStore();

    const resolvePassword = async (reveal: boolean) => {
        const password = await OasisGuardPasswordController.genPassword(
            userStore.credentialId,
            userStore.publicAddress,
            name,
        );
        if (reveal) {
            setResolvedPassword(password);
        }
        return password;
    };

    const copyMutation = useMutation({
        mutationFn: () => resolvePassword(false),
    });

    const revealMutation = useMutation({
        mutationFn: () => resolvePassword(true),
    });

    const getPasswordNameIcon = () => {
        if (name.includes("google")) {
            return GoogleImage;
        } else if (name.includes("github")) {
            return Github;
        } else if (name.includes("metamask")) {
            return Metamask;
        } else if (name.includes("binance")) {
            return Binance;
        } else if (name.includes("argent")) {
            return Argent;
        } else if (name.includes("zerion")) {
            return Zerion;
        } else if (name.includes("rabby")) {
            return Rabby;
        } else if (name.includes("rainbow")) {
            return Rainbow;
        } else if (name.includes("twitter")) {
            return X;
        }
        return DefaultImage;
    };

    const copyToClipboard = async (copyright: string) => {
        await navigator.clipboard.writeText(copyright);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const deletePasswordMutation = useMutation({
        mutationFn: async () => {
            await OasisGuardPasswordController.deletePassword(
                userStore.credentialId,
                userStore.publicAddress,
                name,
            );
            queryClient.refetchQueries({
                queryKey: [Queries.NAMES],
            });
        },
    });

    return (
        <div key={name} className={css(styles.passwordWrapper)}>
            <div className={css(styles.passwordWrapperInner)}>
                <img
                    className={css(styles.image)}
                    src={getPasswordNameIcon()}
                />
                <div className={css(styles.meta)}>
                    <Typography
                        styleOverrides={[styles.password]}
                        fontSize={14}
                    >
                        {name}
                    </Typography>
                    <Typography fontSize={12} styleOverrides={[styles.mask]}>
                        {resolvedPassword || "************"}
                    </Typography>
                </div>
                <div className={css(styles.actions)}>
                    <div
                        onClick={() => {
                            if (resolvedPassword) {
                                setResolvedPassword(null);
                            } else {
                                revealMutation.mutate();
                            }
                        }}
                        className={css(styles.eye)}
                    >
                        {revealMutation.isPending ? (
                            <div className={css(styles.spinner2)}>
                                <ChartCircle size={20} color="white" />
                            </div>
                        ) : resolvedPassword ? (
                            <EyeSlash size={20} color="white" />
                        ) : (
                            <Eye size={20} color="white" />
                        )}
                    </div>
                    <div
                        onClick={() => setExpanded(!expanded)}
                        className={css(styles.arrow)}
                    >
                        {expanded ? (
                            <ArrowDown2 size={20} color="white" />
                        ) : (
                            <ArrowRight2 size={20} color="white" />
                        )}
                    </div>
                </div>
            </div>
            {expanded && (
                <div className={css(styles.buttons)}>
                    <Button
                        isLoading={copyMutation.isPending}
                        onClick={async () => {
                            if (resolvedPassword) {
                                await copyToClipboard(resolvedPassword);
                            } else {
                                const password =
                                    await copyMutation.mutateAsync();
                                await copyToClipboard(password);
                            }
                        }}
                        leftEl={<Copy size={16} color="white" />}
                        color="black"
                        height={32}
                    >
                        {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button
                        color="black"
                        height={32}
                        leftEl={<Share size={16} color="white" />}
                    >
                        Share
                    </Button>
                    <Button
                        onClick={deletePasswordMutation.mutateAsync}
                        isLoading={deletePasswordMutation.isPending}
                        color="danger"
                        height={32}
                        leftEl={<Trash size={16} color="white" />}
                    >
                        Delete
                    </Button>
                </div>
            )}
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
        marginBottom: 48,
    },
    passwordWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingBottom: 12,
        paddingTop: 12,
        borderBottom: "1px solid #121212",
        userSelect: "none",
    },
    passwordWrapperInner: {
        display: "flex",
        width: "100%",
        alignItems: "center",
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
        textOverflow: "ellipsis",
        overflow: "hidden",
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
    spinner: {
        animationName: {
            "0%": {
                transform: "rotate(0deg)",
            },
            "100%": {
                transform: "rotate(360deg)",
            },
        },
        animationIterationCount: "infinite",
        animationDuration: "1s",
        animationTimingFunction: "linear",
        width: 32,
        height: 32,
        margin: "auto",
        marginTop: 24,
    },
    spinner2: {
        animationName: {
            "0%": {
                transform: "rotate(0deg)",
            },
            "100%": {
                transform: "rotate(360deg)",
            },
        },
        animationIterationCount: "infinite",
        animationDuration: "1s",
        animationTimingFunction: "linear",
        width: 20,
        height: 20,
    },
    video: {
        margin: "auto",
        height: 320,
        width: 320,
        marginBottom: 32,
    },
    buttons: {
        marginTop: 12,
        display: "flex",
        gap: 8,
    },
    import: {
        marginTop: 8,
    },
});
