import { css, StyleSheet } from "aphrodite";
import Logo from "data-base64:~assets/logo.png";
import { ArrowLeft, Setting2 } from "iconsax-react";
import type { ReactNode } from "react";

import { Gap } from "~ui";
import { Paths, useNavigation } from "~utils";

type Props = {
    hasBackButton?: boolean;
};

export const Navbar = ({ hasBackButton = false }: Props): ReactNode => {
    const navigation = useNavigation();

    return (
        <div className={css(styles.wrapper)}>
            {hasBackButton ? (
                <ArrowLeft
                    onClick={() => {
                        navigation.pop();
                    }}
                    cursor="pointer"
                    size={24}
                    color="white"
                />
            ) : (
                <Gap direction="horizontal" size={24} />
            )}

            <img className={css(styles.logo)} src={Logo} />
            <Setting2
                onClick={() => {
                    navigation.push(Paths.SETTINGS);
                }}
                cursor="pointer"
                size={24}
                color="white"
            />
        </div>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 48,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    logo: {
        width: 164,
        userSelect: "none",
        pointerEvents: "none",
    },
});
