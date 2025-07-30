import BaseConfig from "./config.base"
import DevConfig from "./config.dev"
import StageConfig from "./config.stage"
import ProdConfig from "./config.prod"

let ExtraConfig = DevConfig

if (process.env.APP_ENV === "prod") {
  ExtraConfig = ProdConfig
} else if (process.env.APP_ENV === "stage") {
  ExtraConfig = StageConfig
}

const Config = { ...BaseConfig, ...ExtraConfig }

export default Config
