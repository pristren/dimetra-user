/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";

const GoogleLocation = ({
  onPlaceSelect,
  selectedPlace,
  setChangeInput,
  changeInput,
}) => {
  const { t } = useTranslation();
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places"); // Use Google Maps Places library

  useEffect(() => {
    if (selectedPlace) {
      setChangeInput(selectedPlace);
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address", "address_components"], // Include address_components
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();

      const getAddressComponent = (type) =>
        place.address_components.find((component) =>
          component.types.includes(type)
        )?.long_name || null;

      const street = getAddressComponent("route");
      const postalCode = getAddressComponent("postal_code");
      const area =
        getAddressComponent("sublocality") || getAddressComponent("locality");
      const city = getAddressComponent("administrative_area_level_1");
      const country = getAddressComponent("country");
      
      setChangeInput(place?.formatted_address);

      onPlaceSelect({ ...place, country, postalCode, street, area, city });
    });
  }, [onPlaceSelect, placeAutocomplete]);

  const handleChange = (e) => {
    setChangeInput(e.target.value);
  };

  return (
    <Input
      ref={inputRef}
      placeholder={t("Choose your location")}
      value={changeInput}
      onChange={handleChange}
    />
  );
};

export default GoogleLocation;
