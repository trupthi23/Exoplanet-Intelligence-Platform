from dotenv import load_dotenv
import os

load_dotenv()

PROJECT_NAME = "Exoplanet Intelligence Platform"

API_VERSION = "1.0.0"

DATABASE_URL = os.getenv("DATABASE_URL")