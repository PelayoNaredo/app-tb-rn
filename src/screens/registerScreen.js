import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Alert,
	Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = async () => {
		try {
			const response = await fetch("http://192.168.1.136:3030/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					email,
					password,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				// Si el registro es exitoso
				const token = data.token;
				await AsyncStorage.setItem("userToken", token);

				Alert.alert(
					"Registration Successful",
					"You have registered successfully!"
				);

				// Navegar a la pantalla de inicio de sesión o dashboard
				navigation.navigate("Login");
			} else {
				// Si hay algún error
				Alert.alert(
					"Registration Failed",
					data.message || "Failed to register. Please try again."
				);
			}
		} catch (error) {
			Alert.alert(
				"Registration Failed",
				"Something went wrong. Please try again later."
			);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Register</Text>

			<TextInput
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				autoCapitalize="none"
			/>

			<Pressable style={styles.button} onPress={handleRegister}>
				<Text style={styles.buttonText}>Register</Text>
			</Pressable>
			<Pressable style={styles.button} onPress={navigation.navigate("Login")}>
				<Text style={styles.buttonText}>Back to Login</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "70%",
		margin: "auto",
		justifyContent: "center",
		paddingHorizontal: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	input: {
		height: 50,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 15,
	},
	button: {
		backgroundColor: "#007BFF",
		paddingVertical: 15,
		borderRadius: 5,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default RegisterScreen;
