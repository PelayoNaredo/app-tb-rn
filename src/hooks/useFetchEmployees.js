import { useState, useEffect } from "react";

const useFetchEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3030/employees");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setEmployees(
          data.map((employee) => ({
            id: employee._id,
            name: employee.firstName,
          }))
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, loading, error };
};

export default useFetchEmployees;
