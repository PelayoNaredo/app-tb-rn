// EmployeeList.js
import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import EmployeeCard from "./employeeCard";

const EmployeeList = () => {
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const response = await fetch("http://localhost:3030/employees");
				const data = await response.json();
				setEmployees(data);
			} catch (error) {
				console.error("Error fetching employees:", error);
			}
		};

		fetchEmployees();
	}, []);

	const handleUpdateEmployee = (updatedEmployee) => {
		// Update the employee list with the modified employee data
		setEmployees((prevEmployees) =>
			prevEmployees.map((emp) =>
				emp._id === updatedEmployee._id ? updatedEmployee : emp
			)
		);
	};

	const renderItem = ({ item }) => (
		<EmployeeCard employee={item} onUpdate={handleUpdateEmployee} />
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={employees}
				keyExtractor={(item) => item._id}
				renderItem={renderItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#f5f5f5",
	},
});

export default EmployeeList;
