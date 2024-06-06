// React
import { useState } from "react";

// Date Picker
import Datepicker from "react-tailwindcss-datepicker";

const DateRangePicker = ({ inputClassName, onChange, useMinDate }) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Datepicker
      primaryColor="main"
      maxDate={new Date()}
      inputClassName={inputClassName}
      value={value}
      onChange={handleValueChange}
      popoverDirection="down"
    />
  );
};
export default DateRangePicker;
