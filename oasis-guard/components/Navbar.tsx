import { css, StyleSheet } from "aphrodite";
import Logo from "data-base64:~assets/logo.png";
import { Setting2 } from "iconsax-react";
import type { ReactNode } from "react";

import { Gap } from "~ui";

export const Navbar = (): ReactNode => {
    return (
        <div className={css(styles.wrapper)}>
            <Gap direction="horizontal" size={32} />
            <img className={css(styles.logo)} src={Logo} />
            <Setting2 cursor="pointer" size={24} color="white" />
        </div>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 48,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 24,
        paddingTop: 16,
    },
    logo: {
        width: 164,
        userSelect: "none",
        pointerEvents: "none",
    },
});
