export const generateTimeSlots = (
  start = "00:00",
  end = "23:30",
  interval = 30
) => {
  const slots = [];
  const startTime = new Date(`1996-01-01T${start}:00`);
  const endTime = new Date(`1996-01-01T${end}:00`);

  while (startTime <= endTime) {
    const hours = String(startTime.getHours()).padStart(2, "0");
    const minutes = String(startTime.getMinutes()).padStart(2, "0");
    slots.push(`${hours}:${minutes}`);
    startTime.setMinutes(startTime.getMinutes() + interval);
  }

  return slots;
};
