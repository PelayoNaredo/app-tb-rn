import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import RegisterForm from "../components/regEmployeeForm"; // Make sure this path is correct
import ShowEmployees from "../components/showEmployees"; // Make sure this path is correct

export default function Employees() {
	const [isRegistering, setIsRegistering] = useState(false);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Employees Screen</Text>
			<View style={styles.switchContainer}>
				<Pressable
					onPress={() => setIsRegistering(false)}
					style={[
						styles.switchButton,
						!isRegistering
							? styles.switchButtonActive
							: styles.switchButtonInactive,
					]}
				>
					<Text style={styles.switchButtonText}>Show Employees</Text>
				</Pressable>
				<Pressable
					onPress={() => setIsRegistering(true)}
					style={[
						styles.switchButton,
						isRegistering
							? styles.switchButtonActive
							: styles.switchButtonInactive,
					]}
				>
					<Text style={styles.switchButtonText}>Register Employee</Text>
				</Pressable>
			</View>
			<View style={styles.formContainer}>
				{isRegistering ? <RegisterForm /> : <ShowEmployees />}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 24,
		marginBottom: 16,
	},
	switchContainer: {
		flexDirection: "row",
		marginBottom: 16,
	},
	switchButton: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 5,
		width: 200,
		paddingHorizontal: 15,
		borderRadius: 25,
		marginHorizontal: 5,
	},
	switchButtonActive: {
		backgroundColor: "blue",
	},
	switchButtonInactive: {
		backgroundColor: "gray",
	},
	switchButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	formContainer: {
		flex: 1,
		width: "100%",
	},
});
