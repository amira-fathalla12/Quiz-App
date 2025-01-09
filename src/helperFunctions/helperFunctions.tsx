const formatDate = (dateStr: string) => {
  const date: Date = new Date(dateStr);
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  return `${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }-${year}`;
};
const formatTime = (dateStr: string) => {
  const date: Date = new Date(dateStr);
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12;

  // Format time as HH:MM AM/PM
  const time = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  return time;
};

export { formatDate, formatTime };
