import { useEffect } from "react"

export const useInitialStyling = (): void => {
  useEffect(() => {
    document.body.style.margin = "0px"
    document.body.style.background = "black"

    const style = document.createElement("style")
    style.append(
      `@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');`
    )
    document.head.appendChild(style)
  }, [])
}
