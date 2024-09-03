import { useState } from "react";

export const useShifts = () => {
  const [shifts, setShifts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShiftsByDate = async (date) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3030/shifts/date/${date}`);
      if (!response.ok) throw new Error("Failed to fetch shifts");

      const data = await response.json();

      // Convertir el array de turnos en un objeto
      const formattedShifts = {};
      data.forEach((shift) => {
        formattedShifts[shift.employeeName] = shift.shifts;
      });

      setShifts(formattedShifts);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const saveShift = async (employee, date, newShifts) => {
    try {
      // Step 1: Attempt to find the shift for the specific employee and date
      const response = await fetch(`http://localhost:3030/shifts/date/${date}`);

      if (!response.ok) throw new Error("Failed to fetch shifts");

      const shiftsForDate = await response.json();

      // Step 2: Find if the employee shift exists for the given date
      const existingShift = shiftsForDate.find(
        (shift) => shift.employeeName === employee
      );

      if (existingShift) {
        // Step 3: Update the existing shift
        await fetch(`http://localhost:3030/shifts/${existingShift._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employeeName: employee,
            date,
            shifts: newShifts,
          }),
        });
      } else {
        // Step 4: Create a new shift since it does not exist
        await fetch(`http://localhost:3030/shifts/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employeeName: employee,
            date,
            shifts: newShifts,
          }),
        });
      }

      // Step 5: Refresh the shifts for the specified date
      fetchShiftsByDate(date);
    } catch (err) {
      setError(err);
      console.error("Error saving shift:", err);
    }
  };

  return { shifts, loading, fetchShiftsByDate, saveShift, error };
};
