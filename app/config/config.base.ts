export type Environment = "dev" | "stage" | "prod"

export interface ConfigBaseProps {
  environment: Environment

  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]

  apiBaseUrl: string
  useMock: {
    questions: boolean
    answers: boolean
    survey: boolean
    session: boolean
  }
}

const BaseConfig: ConfigBaseProps = {
  environment: "dev", // will be overridden

  persistNavigation: "dev",
  catchErrors: "always",
  exitRoutes: ["Login"],

  apiBaseUrl: "",
  useMock: {
    questions: false,
    answers: false,
    survey: false,
    session: false,
  },
}

export default BaseConfig
