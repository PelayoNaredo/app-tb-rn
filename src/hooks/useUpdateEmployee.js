import { useState } from "react";

export const useUpdateEmployee = (onUpdate) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateEmployee = async (employee) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3030/employees/${employee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      const updatedEmployee = await response.json();

      // Callback to update the employee in the parent component
      onUpdate(updatedEmployee);
    } catch (err) {
      console.error("Error updating employee:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateEmployee, loading, error };
};
