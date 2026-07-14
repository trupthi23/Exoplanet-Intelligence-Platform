import pandas as pd


FEATURES = [
    "planet_radius_earth",
    "planet_mass_earth",
    "equilibrium_temperature",
    "orbital_period_days"
]


def prepare_features(df):

    data = df.copy()

    for col in FEATURES:
        data[col] = data[col].fillna(data[col].median())

    return data