/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";
import Select from "react-select";

const GoogleLocation = ({ onPlaceSelect }) => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(async (query) => {
    setLoading(true);
    setError(null);

    if (query.trim() === "") {
      setPlaces([]);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("/search/google-location", {
        params: { query },
      });

      if (response.data.length === 0) {
        setError("No places found for this search.");
        setPlaces([]);
      } else {
        setPlaces(
          response?.data?.map((place) => ({
            label: place?.name,
            value: place?.place_id,
            key: { ...place },
          }))
        );
      }
    } catch (err) {
      console.error("Error fetching places:", err);
      setError("Failed to fetch places. Please try again later.");
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }, 500);

  const handleQueryChange = (newQuery) => {
    debouncedSearch(newQuery);
  };

  const handleSelectPlace = (selectedOption) => {
    setQuery(selectedOption);
    const { name, formatted_address, geometry, place_id, address_components } =
      selectedOption.key;

    const addressComponents = address_components
      ? address_components.reduce((acc, component) => {
          if (component.types.includes("country")) {
            acc.country = component.long_name;
          } else if (component.types.includes("postal_code")) {
            acc.postalCode = component.long_name;
          } else if (component.types.includes("route")) {
            acc.street = component.long_name;
          } else if (component.types.includes("locality")) {
            acc.city = component.long_name;
          } else if (component.types.includes("sublocality")) {
            acc.area = component.long_name;
          }
          return acc;
        }, {})
      : {};

    if (Object.keys(addressComponents).length === 0 && formatted_address) {
      const addressParts = formatted_address
        .split(",")
        .map((part) => part.trim());

      if (addressParts.length > 3) {
        addressComponents.street = addressParts[0];
        addressComponents.city = addressParts[addressParts.length - 3];
        addressComponents.country = addressParts[addressParts.length - 1];
      }

      const postalCodeMatch = formatted_address.match(/\d{4,5}/);
      if (postalCodeMatch) {
        addressComponents.postalCode = postalCodeMatch[0];
      }
    }

    const placeDetails = {
      name,
      formatted_address,
      geometry,
      place_id,
      ...addressComponents,
    };
    onPlaceSelect(placeDetails);
    setPlaces([]);
    setLoading(false);
  };

  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={query}
        onInputChange={handleQueryChange}
        onChange={handleSelectPlace}
        isLoading={loading}
        isClearable
        placeholder="Search for a place"
        options={places}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GoogleLocation;
