from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    app_name: str = "CoreExplore API"
    database_url: str = "sqlite:///./coreexplore.db"
    debug: bool = True


settings = Settings()
