import pandas as pd

from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors

from app.database import engine
from app.ml.preprocess import prepare_features, FEATURES


def load_model():

    # Read planets directly from PostgreSQL
    df = pd.read_sql("SELECT * FROM planets", engine)

    # Fill missing values
    df = prepare_features(df)

    # Scale features
    scaler = StandardScaler()

    X = scaler.fit_transform(
        df[FEATURES]
    )

    # Train Nearest Neighbors model
    model = NearestNeighbors(
        n_neighbors=6,
        metric="euclidean"
    )

    model.fit(X)

    return model, scaler, df