import type { ReactNode } from "react"

import { Button, Typography } from "~ui"

export const Landing = (): ReactNode => {
  return (
    <div>
      <Typography fontSize={20}>Landing</Typography>
      <Button>Hello</Button>
    </div>
  )
}
