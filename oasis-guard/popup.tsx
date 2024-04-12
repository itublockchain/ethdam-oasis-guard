import { css, StyleSheet } from "aphrodite"

import { Dimensions } from "~utils"

function IndexPopup() {
  return <div className={css(styles.wrapper)}></div>
}

const styles = StyleSheet.create({
  wrapper: {
    width: Dimensions.width,
    height: Dimensions.heigth
  }
})

export default IndexPopup
