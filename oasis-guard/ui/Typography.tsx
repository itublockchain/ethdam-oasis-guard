import { css, StyleSheet } from "aphrodite"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

interface Props extends ComponentPropsWithoutRef<"span"> {
  children: ReactNode
  styleOverrides?: object[]
  fontSize?: number
}

export const Typography = ({
  children,
  styleOverrides = [],
  fontSize,
  ...props
}: Props): ReactNode => {
  return (
    <span
      {...props}
      style={{
        fontSize
      }}
      className={css(styles.wrapper, ...styleOverrides)}>
      {children}
    </span>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    color: "white",
    fontFamily: "Roboto, sans-serif"
  }
})
