import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from "react"

type NavigationMethodParams = (path: string, params?: any) => void

type NavigationStackItem = {
  path: string
  params?: any
}

type NavigationObject = {
  push: NavigationMethodParams
  pop: () => void
  canGoBack: () => boolean
}

type NavigationContextType = {
  stack: Array<NavigationStackItem>
  setStack: Dispatch<SetStateAction<Array<NavigationStackItem>>>
}

const NavigationContext = createContext<NavigationContextType>({
  stack: [],
  setStack: () => undefined
})

export const NavigationProvider = ({
  children,
  initialRoute
}: {
  children: ReactNode
  initialRoute: NavigationStackItem
}): ReactNode => {
  const [stack, setStack] = useState<Array<NavigationStackItem>>([initialRoute])

  return (
    <NavigationContext.Provider
      value={{
        stack,
        setStack
      }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigationContext = (): NavigationContextType => {
  const context = useContext(NavigationContext)
  return context
}

export const useNavigation = (): NavigationObject => {
  const context = useNavigationContext()

  return useMemo(() => {
    return {
      push: (path: string, params?: any): void => {
        context.setStack((stack) => {
          const top = stack[stack.length - 1]
          if (top.path === path) {
            return stack
          } else {
            return [...stack, { path, params }]
          }
        })
      },
      pop: (): void => {
        context.setStack((stack) => {
          if (stack.length === 1) {
            return stack
          }
          return stack.filter((_, index) => index !== stack.length - 1)
        })
      },
      canGoBack: (): boolean => {
        return context.stack.length > 1
      }
    }
  }, [])
}

export const NavigationScreen = ({
  path,
  children
}: {
  path: string
  children: ReactNode
}): ReactNode => {
  const navigation = useNavigationContext()
  const top = navigation.stack[navigation.stack.length - 1]

  if (top.path === path) {
    return children
  } else {
    return null
  }
}
