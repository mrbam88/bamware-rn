import type { ConfigBaseProps } from "./config.base"

const StageConfig: Partial<ConfigBaseProps> = {
  environment: "stage",
  apiBaseUrl: "http://localhost:8000/api",

  useMock: {
    questions: false,
    answers: false,
    survey: false,
    session: false,
  },
}

export default StageConfig
