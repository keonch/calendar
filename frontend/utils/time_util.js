// parses from date object to 12-hour AM/PM string format
export const formatTime = (time) => {
  if (typeof time === "string") {
    time = new Date(Date.parse(time));
  }
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes === 59) return "End of day";
  let period = hours < 12 ? "AM" : "PM";

  if (hours === 0) hours = 12;
  if (hours < 10) hours = "0".concat(`${hours}`);
  if (hours > 12) hours -= 12;
  if (minutes < 10) minutes = "0".concat(`${minutes}`);

  return `${hours}:${minutes} ${period}`
};

// parses time strings into integer values for "slider" HTML element
export const parseTimeToSliderValue = (time) => {
  const date = new Date(Date.parse(time));
  const minutes = date.getHours() * 60 + date.getMinutes();
  const value = (minutes / 100) + 10;
  return value.toFixed(1);
};