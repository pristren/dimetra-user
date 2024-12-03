/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";
import Select from "react-select";

const GoogleLocation = ({ onPlaceSelect, userInfo }) => {
  const [query, setQuery] = useState({
    label: userInfo?.address,
    value: userInfo?.address,
  });
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
          response.data.map((place) => ({
            label: place.description,
            value: place.place_id,
            key: place,
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

    const placeDetails = {
      description: selectedOption.key.description,
      place_id: selectedOption.key.place_id,
      terms: selectedOption.key.terms,
      types: selectedOption.key.types,
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
