import { useState } from "react";

export const useSubmitEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitEmployee = async (employeeData) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3030/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.error ||
            "An unknown error occurred. Please complete all fields correctly."
        );
        return;
      }

      const result = await response.json();
      console.log("Employee registered:", result);
      setErrorMessage("Employee registered successfully.");
    } catch (error) {
      console.error("Error registering employee:", error);
      setErrorMessage("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { submitEmployee, loading, errorMessage };
};
