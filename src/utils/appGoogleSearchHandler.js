export const handleLocationChangeForPickup = (addressValue, setValue) => {
  const autocompleteData = {
    address: addressValue.formatted_address,
    country: addressValue?.country,
    city: addressValue?.city,
    area: addressValue?.area,
    postalCode: addressValue?.postalCode,
    street: addressValue?.street,
  };

  setValue((prev) => ({
    ...prev,
    destinationDetailsData: {
      ...prev.destinationDetailsData,
      pick_up_country: autocompleteData.country,
      pick_up_address: autocompleteData.address,
      pick_up_postal_code: autocompleteData.postalCode,
      pick_up_city: autocompleteData.city,
      area_room: autocompleteData.area,
    },
  }));
};

export const handleLocationChangeForDropOff = (addressValue, setValue) => {
  const autocompleteData = {
    address: addressValue.formatted_address,
    country: addressValue?.country,
    city: addressValue?.city,
    area: addressValue?.area,
    postalCode: addressValue?.postalCode,
    street: addressValue?.street,
  };

  setValue((prev) => ({
    ...prev,
    destinationDetailsData: {
      ...prev.destinationDetailsData,
      drop_off_country: autocompleteData.country,
      drop_off_address: autocompleteData.address,
      drop_off_postal_code: autocompleteData.postalCode,
      drop_off_city: autocompleteData.city,
    },
  }));
};
