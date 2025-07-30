import type { ConfigBaseProps } from "./config.base"

const ProdConfig: Partial<ConfigBaseProps> = {
  environment: "prod",
  apiBaseUrl: "http://localhost:8000/api",

  useMock: {
    questions: false,
    answers: false,
    survey: false,
    session: false,
  },
}

export default ProdConfig
