export const transportOptions = [
  { value: "transfer_trip", label: "transfer_trip" },
  { value: "investigation_trip", label: "investigation_trip" },
  { value: "private_trips", label: "private_trips" },
  { value: "relocation", label: "relocation" },
  { value: "recurring", label: "recurring" },
];

export const transportModesOptions = [
  { value: "wheelchair_mts", label: "wheelchair_mts" },
  { value: "own_wheelchair", label: "in_own_wheelchair" },
  { value: "lying_down", label: "lying_down" },
  { value: "pedestrian", label: "pedestrian" },
];

export const transportWithOptions = [
  { value: "none_of_that", label: "none_of_that" },
  { value: "infusion", label: "infusion" },
  { value: "infusomat", label: "infusomat" },
  { value: "accompanying_reason", label: "accompanying_reason" },
  { value: "oxygen_quantity", label: "oxygen_liters_per_min" },
  { value: "second_transport_helper", label: "second_transport_helper" },
  { value: "carrying_chair", label: "carrying_chair" },
];

export const weekdaysOptions = [
  { value: "monday", label: "mo" },
  { value: "tuesday", label: "tu" },
  { value: "wednesday", label: "we" },
  { value: "thursday", label: "th" },
  { value: "friday", label: "fr" },
  { value: "saturday", label: "sa" },
  { value: "sunday", label: "su" },
];

export const durationOptions = [
  { value: "1month", label: "1 Month" },
  { value: "3months", label: "3 Months" },
  { value: "6months", label: "6 Months" },
  { value: "1year", label: "After 1 Year" },
];

export const timeOptions = [
  { value: "00:00", label: "00:00" },
  { value: "00:30", label: "00:30" },
  { value: "01:00", label: "01:00" },
  { value: "01:30", label: "01:30" },
  { value: "02:00", label: "02:00" },
  { value: "02:30", label: "02:30" },
  { value: "03:00", label: "03:00" },
  { value: "03:30", label: "03:30" },
  { value: "04:00", label: "04:00" },
  { value: "04:30", label: "04:30" },
  { value: "05:00", label: "05:00" },
  { value: "05:30", label: "05:30" },
  { value: "06:00", label: "06:00" },
  { value: "06:30", label: "06:30" },
  { value: "07:00", label: "07:00" },
  { value: "07:30", label: "07:30" },
  { value: "08:00", label: "08:00" },
  { value: "08:30", label: "08:30" },
  { value: "09:00", label: "09:00" },
  { value: "09:30", label: "09:30" },
  { value: "10:00", label: "10:00" },
  { value: "10:30", label: "10:30" },
  { value: "11:00", label: "11:00" },
  { value: "11:30", label: "11:30" },
  { value: "12:00", label: "12:00" },
  { value: "12:30", label: "12:30" },
  { value: "13:00", label: "13:00" },
  { value: "13:30", label: "13:30" },
  { value: "14:00", label: "14:00" },
  { value: "14:30", label: "14:30" },
  { value: "15:00", label: "15:00" },
  { value: "15:30", label: "15:30" },
  { value: "16:00", label: "16:00" },
  { value: "16:30", label: "16:30" },
  { value: "17:00", label: "17:00" },
  { value: "17:30", label: "17:30" },
  { value: "18:00", label: "18:00" },
  { value: "18:30", label: "18:30" },
  { value: "19:00", label: "19:00" },
  { value: "19:30", label: "19:30" },
  { value: "20:00", label: "20:00" },
  { value: "20:30", label: "20:30" },
  { value: "21:00", label: "21:00" },
  { value: "21:30", label: "21:30" },
  { value: "22:00", label: "22:00" },
  { value: "22:30", label: "22:30" },
  { value: "23:00", label: "23:00" },
  { value: "23:30", label: "23:30" },
];

export const createOrderDefaultState = {
  transportationData: {
    type_of_transport: "",
    mode_of_transportation: "",
    transport_with: [],
    oxygen_quantity: null,
  },
  recurringData: {
    recurring_type: "",
    start_date: null,
    return_date: null,
    start_time: "",
    return_time: "",
    multiple_week_days: [],
    ends: "",
    free_dates: [new Date()],
    free_dates_start_time: "",
    free_dates_return_time: "",
  },
  patientData: {
    name: "",
    surname: "",
    date_of_birth: null,
    area_room: "",
    cost_center: "",
    how_much: "",
    which: "",
    isolation: false,
    patient_above_90kg: false,
  },
  destinationDetailsData: {
    pick_up_name: "",
    pick_up_address: "",
    pick_up_postal_code: 0,
    pick_up_city: "",
    pick_up_country: "",
    pickup_phone: "",
    pick_up_employee_name: "",
    drop_off_pick_up_date: null,
    drop_off_pick_up_time: "",
    pickup_appointment_time: "",
    drop_off_name: "",
    drop_off_address: "",
    drop_off_postal_code: "",
    drop_off_city: "",
    drop_off_country: "",
    drop_off_phone: "",
    return_date: null,
    return_approx_time: "",
  },
  billingDetailsData: {
    pre_name: "",
    name: "",
    street: "",
    place: "",
    contact: "",
    contact_phone: "",
  },
};
