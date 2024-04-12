import { useEffect } from "react"

export const useInitialStyling = (): void => {
  useEffect(() => {
    document.body.style.margin = "0px"
    document.body.style.background = "black"

    const style = document.createElement("style")
    style.append(
      `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100;9..40,200;9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');`
    )
    document.head.appendChild(style)
  }, [])
}
