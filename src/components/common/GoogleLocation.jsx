import React, { useState, useEffect, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { forEach } from "lodash";

const GoogleLocationInput = ({ onPlaceSelect, selectedPlace }) => {
  const { t } = useTranslation();
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places"); // Use Google Maps Places library
  const [changeInput, setChangeInput] = useState("");

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
      const addressComponents = place.address_components;
      let country = null;
      let city = null;
      let postalCode = null;

      forEach(addressComponents, (component) => {
        if (component.types.includes("country")) country = component.long_name;
        if (component.types.includes("locality")) city = component.long_name;
        if (component.types.includes("postal_code"))
          postalCode = component.long_name;
      });
      setChangeInput(place?.formatted_address);
      // Call the onPlaceSelect callback with the place and country
      onPlaceSelect({ ...place, country, city, postalCode });
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <Input
      ref={inputRef}
      placeholder={t("Choose your location")}
      value={changeInput}
      onChange={(e) => setChangeInput(e.target.value)}
    />
  );
};

export default GoogleLocationInput;
