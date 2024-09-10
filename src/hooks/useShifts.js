import { useState } from "react";

export const useShifts = () => {
  const [shifts, setShifts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShiftsByDate = async (date) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3030/shifts/${date}`);
      if (response.ok) {
        const data = await response.json();
        setShifts(data.shifts);
      } else if (response.status === 404) {
        // No shifts found, initialize with empty shifts
        setShifts({});
        // Optionally, create a new document with empty shifts
        await fetch(`http://localhost:3030/shifts/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            employeeId: "", // Not used but required for schema
            shifts: {}, // Empty shifts
          }),
        });
      } else {
        throw new Error("Failed to fetch shifts");
      }
    } catch (err) {
      setError(err);
      console.error("Error fetching shifts:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveShift = async (employeeId, date, newShifts) => {
    try {
      // Update local state directly
      setShifts(prevShifts => ({
        ...prevShifts,
        [employeeId]: newShifts
      }));

      await fetch(`http://localhost:3030/shifts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          employeeId,
          shifts: newShifts,
        }),
      });
    } catch (err) {
      setError(err);
      console.error("Error saving shift:", err);
    }
  };

  return { shifts, loading, fetchShiftsByDate, saveShift, error };
};
