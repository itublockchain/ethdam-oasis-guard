import { QueryClientProvider } from "@tanstack/react-query";
import { css, StyleSheet } from "aphrodite";
import type { ReactNode } from "react";
import { RecoilRoot } from "recoil";

import { Dimensions } from "~utils";
import { queryClient } from "~utils/query";

type Props = {
    children: ReactNode;
};

export const AppWrapper = ({ children }: Props): ReactNode => {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <div className={css(styles.wrapper)}>{children}</div>
            </QueryClientProvider>
        </RecoilRoot>
    );
};

//eslint-disable-next-line
const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        backgroundColor: "black",
        padding: 0,
        margin: 0,
        flexDirection: "column",
        width: Dimensions.width,
        height: Dimensions.heigth,
        marginLeft: "auto",
        marginRight: "auto",
    },
});
