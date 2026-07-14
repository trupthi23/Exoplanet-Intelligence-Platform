from app.ml.model_loader import load_model
from app.ml.preprocess import FEATURES


model, scaler, df = load_model()


def get_similar_planets(planet_id):

    planet = df[df["id"] == planet_id]

    if planet.empty:
        return []

    x = scaler.transform(
        planet[FEATURES]
    )

    distances, indices = model.kneighbors(x)

    recommendations = []

    for idx in indices[0][1:]:

        row = df.iloc[idx]

        recommendations.append({

            "id": int(row["id"]),

            "planet_name": row["planet_name"],

            "host_star": row["host_star"],

            "discovery_method": row["discovery_method"],

            "discovery_year": int(row["discovery_year"])
            if row["discovery_year"] is not None
            else None,

            "planet_radius_earth": row["planet_radius_earth"],

            "planet_mass_earth": row["planet_mass_earth"]

        })

    return recommendations