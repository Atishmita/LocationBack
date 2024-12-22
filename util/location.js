const axios = require("axios");
const HttpError = require("../models/http-error");

async function getCoordsForAddress(address) {
  // Nominatim API for OpenStreetMap
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=geojson&addressdetails=1&limit=1`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = data.features[0].geometry.coordinates;

  return coordinates;
}

module.exports = getCoordsForAddress;
