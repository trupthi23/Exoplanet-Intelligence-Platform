import pandas as pd
from sqlalchemy import create_engine
from pathlib import Path

# PostgreSQL Connection
DATABASE_URL = "postgresql://postgres:kbt%402305@localhost:5432/exoplanet_db"

engine = create_engine(DATABASE_URL)

# Locate Project Root
BASE_DIR = Path(__file__).resolve().parent.parent

# CSV Path
csv_path = BASE_DIR / "data" / "processed" / "clean_planet_data.csv"

print(f"Reading CSV from:\n{csv_path}\n")

# Read CSV
df = pd.read_csv(csv_path)

print(f"Rows Loaded: {len(df)}")
print(df.head())

# Load into PostgreSQL
df.to_sql(
    "planets",
    engine,
    if_exists="append",
    index=False
)

print("\n✅ Data imported successfully!")
print(df.columns.tolist())