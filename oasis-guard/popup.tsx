import { css, StyleSheet } from "aphrodite";

import { AppWrapper } from "~components";
import { useInitialStyling } from "~hooks";
import { AddPassword, Home, Landing, Settings } from "~pages";
import {
    Dimensions,
    NavigationProvider,
    NavigationScreen,
    Paths,
} from "~utils";

function App() {
    useInitialStyling();

    return (
        <AppWrapper>
            <NavigationProvider
                initialRoute={{
                    path: Paths.LANDING,
                }}
            >
                <NavigationScreen path={Paths.LANDING}>
                    <Landing />
                </NavigationScreen>
                <NavigationScreen path={Paths.HOME}>
                    <Home />
                </NavigationScreen>
                <NavigationScreen path={Paths.SETTINGS}>
                    <Settings />
                </NavigationScreen>
                <NavigationScreen path={Paths.ADD_PASSWORD}>
                    <AddPassword />
                </NavigationScreen>
            </NavigationProvider>
        </AppWrapper>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: Dimensions.width,
        height: Dimensions.heigth,
    },
});

export default App;
