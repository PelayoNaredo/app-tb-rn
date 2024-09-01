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

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleLogin = async () => {
		try {
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

			if (response.ok) {
				const token = data.token;

				await AsyncStorage.setItem("userToken", token);

				setMessage("Login Successful!");
				setTimeout(() => {
					navigation.navigate("Home");
				}, 1000);
			} else {
				setMessage(data.message || "Invalid email or password.");
			}
		} catch (error) {
			setMessage("Something went wrong. Please try again later.");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			{message ? <Text style={styles.message}>{message}</Text> : null}
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
		backgroundColor: "#F2F2F2",
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
	message: {
		color: "red",
		fontSize: 16,
		textAlign: "center",
		marginBottom: 15,
	},
});

export default LoginScreen;
