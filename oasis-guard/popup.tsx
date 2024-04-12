import { css, StyleSheet } from "aphrodite"

import { AppWrapper } from "~components"
import { useInitialStyling } from "~hooks"
import { Landing } from "~pages"
import { Dimensions, NavigationProvider, NavigationScreen, Paths } from "~utils"

function App() {
  useInitialStyling()

  return (
    <AppWrapper>
      <NavigationProvider
        initialRoute={{
          path: Paths.LANDING
        }}>
        <NavigationScreen path={Paths.LANDING}>
          <Landing />
        </NavigationScreen>
      </NavigationProvider>
    </AppWrapper>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: Dimensions.width,
    height: Dimensions.heigth
  }
})

export default App
