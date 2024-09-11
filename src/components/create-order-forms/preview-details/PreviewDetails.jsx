import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/DatePIcker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import AppSelect from "@/components/common/AppSelect";

const PreviewDetails = () => {
  const transportOptions = [
    { value: "ambulance", label: "Ambulance" },
    { value: "helicopter", label: "Helicopter" },
    { value: "privateCar", label: "Private Car" },
  ];

  const transportModesOptions = [
    { value: "bus", label: "Bus" },
    { value: "train", label: "Train" },
    { value: "car", label: "Car" },
    { value: "bike", label: "Bike" },
  ];

  const transportWithOptions = [
    { value: "driver", label: "Driver" },
    { value: "guide", label: "Guide" },
    { value: "assistant", label: "Assistant" },
    { value: "accompanied", label: "Accompanied" },
  ];

  const weekdaysOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const durationOptions = [
    { value: "1month", label: "1 Month" },
    { value: "3months", label: "3 Months" },
    { value: "6months", label: "6 Months" },
    { value: "1year", label: "After 1 Year" },
  ];
  return (
    <div className="w-[65%] p-8">
      {/* Single Card for all details */}
      <Card className="w-full px-5 py-5">
        <CardHeader>
          <CardTitle>Preview Details</CardTitle>
        </CardHeader>
        <CardContent className="px-10">
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-5">
              <div className="border-r pr-5">
                <h2 className="text-lg font-medium mb-4">
                  Transportart (einfach Auswahl)
                </h2>
                <RadioGroup>
                  {transportOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="border-r pr-5">
                <h2 className="text-lg font-medium mb-4">
                  Beförderungsart (mehrfach Auswahl)
                </h2>
                {transportModesOptions.map((option) => (
                  <div key={option.value} className="flex items-center mb-2">
                    <Checkbox id={option.value} />
                    <Label className="ml-2" htmlFor={option.value}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">
                  Transport MIT (mehrfach Auswahl)
                </h2>
                {transportWithOptions.map((option) => (
                  <div key={option.value} className="flex items-center mb-2">
                    <Checkbox id={option.value} />
                    <Label className="ml-2" htmlFor={option.value}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-lg font-medium mb-3 mt-5">Select Weekdays:</h3>
            <AppSelect
              items={["Week 1", "Week 2", "Week 3"]}
              placeholder="Week 1"
            />

            <h3 className="text-lg font-medium mb-3 mt-5">
              Select Start Date and Time:
            </h3>
            <div className="mb-5 flex w-max gap-4 items-center">
              <DatePicker />
              <Input placeholder="00:00" />
            </div>

            <h3 className="text-lg font-medium mb-3">
              Select Weekdays (mehrfach Auswahl):
            </h3>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {weekdaysOptions.map((option) => (
                <div key={option.value} className="flex items-center mb-2">
                  <Checkbox id={option.value} />
                  <Label className="ml-2" htmlFor={option.value}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-medium mb-3 mt-5">Ends:</h3>
            <RadioGroup>
              {durationOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 mb-2"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            <h2 className="text-lg font-semibold mt-5">
              Summary: Monthly on day 4
            </h2>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>
              <div className="grid grid-cols-2 gap-5">
                <div className="mb-5">
                  <label className="block mb-2 font-medium">
                    Name <sup className="text-[13px]">*</sup>
                  </label>
                  <Input
                    readOnly
                    value="John"
                    placeholder="Type your name"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 font-medium">
                    Surname <sup className="text-[13px]">*</sup>
                  </label>
                  <Input
                    readOnly
                    value="Doe"
                    placeholder="Type your surname"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 font-medium">
                    Date of Birth <sup className="text-[13px]">*</sup>
                  </label>
                  <Input
                    readOnly
                    value="01/01/1990"
                    placeholder="Type your date of birth"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 font-medium">
                    Area/Room <sup className="text-[13px]">*</sup>
                  </label>
                  <Input
                    readOnly
                    value="Room 101"
                    placeholder="Type your area or room"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 font-medium">
                    Kostenstelle <sup className="text-[13px]">*</sup>
                  </label>
                  <Input
                    readOnly
                    value="12345"
                    placeholder="Type your kostenstelle"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 font-medium">How Much</label>
                  <Input
                    readOnly
                    value="50"
                    placeholder="Type how much"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 font-medium">Isolation</label>
                  <div className="flex items-center">
                    <Checkbox checked={true} readOnly />
                    <label className="text-gray-500 font-medium text-[15px] cursor-pointer ml-2">
                      Yes
                    </label>
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block mb-2 font-medium">
                    Patient Above 90 kg
                  </label>
                  <div className="flex items-center">
                    <Checkbox checked={false} readOnly />
                    <label className="text-gray-500 font-medium text-[15px] cursor-pointer ml-2">
                      No
                    </label>
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block mb-2 font-medium">Special</label>
                  <Input
                    readOnly
                    value="Requires special attention"
                    placeholder="Type any special requirements"
                    className="border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Destination Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Destination Details
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <div className="pr-5">
                  <h3 className="text-xl font-semibold mb-4">Pick-Up</h3>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      Name / Institution <sup className="text-[13px]">*</sup>
                    </label>
                    <Input
                      readOnly
                      value="Hospital A"
                      placeholder="Pre filled"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      Address <sup className="text-[13px]">*</sup>
                    </label>
                    <Input
                      readOnly
                      value="123 Main St"
                      placeholder="Pre filled"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      City <sup className="text-[13px]">*</sup>
                    </label>
                    <Input
                      readOnly
                      value="New York"
                      placeholder="Enter City Name"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      Country <sup className="text-[13px]">*</sup>
                    </label>
                    <Input
                      readOnly
                      value="USA"
                      placeholder="Enter Country "
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      Working Employee Name <sup className="text-[13px]">*</sup>
                    </label>
                    <Input
                      readOnly
                      value="John Smith"
                      placeholder="Type the working employee's name"
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div className="pl-5">
                  <h3 className="text-xl font-semibold mb-4">Drop-Off</h3>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      Date <sup className="text-[13px]">*</sup>
                    </label>
                    <DatePicker selected={new Date()} readOnly />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      Abholzeit <sup className="text-[13px]">*</sup>
                    </label>
                    <Input
                      readOnly
                      value="14:30"
                      placeholder="Pick-Up Time"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      Name / Institution <sup className="text-[13px]">*</sup>
                    </label>
                    <Input
                      readOnly
                      value="Clinic B"
                      placeholder="Enter Name"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      Address <sup className="text-[13px]">*</sup>
                    </label>
                    <Input
                      readOnly
                      value="456 Elm St"
                      placeholder="Enter Address"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      City <sup className="text-[13px]">*</sup>
                    </label>
                    <Input
                      readOnly
                      value="Los Angeles"
                      placeholder="Enter City Name"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      Country <sup className="text-[13px]">*</sup>
                    </label>
                    <Input
                      readOnly
                      value="USA"
                      placeholder="Enter Country"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">Phone</label>
                    <Input
                      readOnly
                      value="123-456-7890"
                      placeholder="Type the phone number"
                      className="border-gray-300"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mt-8 mb-4">Rückfahrt</h3>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      Date <sup className="text-[13px]">*</sup>
                    </label>
                    <DatePicker selected={new Date()} readOnly />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">Today</label>
                    <Input
                      readOnly
                      value="1 day later"
                      placeholder="1 day later"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">Time</label>
                    <Input
                      readOnly
                      value="20:54"
                      placeholder="Enter Time"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 font-medium">
                      Stock / Abteilung
                    </label>
                    <Input
                      readOnly
                      value="Inventory"
                      placeholder="Type the stock or department"
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Billing Address</h2>
              <div className="grid grid-cols-2 gap-5">
                <div className="mb-5">
                  <label className="block mb-2 font-medium">
                    Prename/Institution
                  </label>
                  <Input
                    readOnly
                    value="ABC Hospital"
                    placeholder="Type your prename or institution"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 font-medium">Name</label>
                  <Input
                    readOnly
                    value="John Doe"
                    placeholder="Type your name"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 font-medium">Street</label>
                  <Input
                    readOnly
                    value="789 Oak St"
                    placeholder="Type your street"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 font-medium">Place</label>
                  <Input
                    readOnly
                    value="Chicago"
                    placeholder="Type your place"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 font-medium">Contact</label>
                  <Input
                    readOnly
                    value="987-654-3210"
                    placeholder="Type your contact number"
                    className="border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewDetails;
