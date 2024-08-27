import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			console.log("Email:", email);
			console.log("Password:", password);

			const response = await fetch("http://192.168.1.136:3030/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();
			console.log("Response Data:", data);

			if (response.ok) {
				// Si el inicio de sesión es exitoso
				const token = data.token;

				await AsyncStorage.setItem("userToken", token);

				Alert.alert("Login Successful", "You have logged in successfully!");

				// Navegar a la siguiente pantalla o dashboard
				navigation.navigate("Home");
			} else {
				// Si hay algún error
				Alert.alert(
					"Login Failed",
					data.message || "Invalid email or password."
				);
			}
		} catch (error) {
			Alert.alert(
				"Login Failed",
				"Something went wrong. Please try again later."
			);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>

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

			<Pressable style={styles.button} onPress={handleLogin}>
				<Text style={styles.buttonText}>Login</Text>
			</Pressable>
			<Pressable
				style={styles.button}
				onPress={() => navigation.navigate("Register")}
			>
				<Text style={styles.buttonText}>Go to Register</Text>
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
		marginTop: 20,
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

export default LoginScreen;
