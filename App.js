import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Shifts from "./src/components/Shifts.js";
import Employees from "./src/components/Employees.js";
import Sells from "./src/components/Sells.js";
import Inventory from "./src/components/Inventory.js";

const iconH = require("./src/assets/icons/hourLogo.png");
const iconE = require("./src/assets/icons/employLogo.png");
const iconS = require("./src/assets/icons/sellsLogo.png");
const iconI = require("./src/assets/icons/inventoryLogo.png");

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				{/* stilize for phone */}
				<Text style={styles.title}>GESTION MANAGER</Text>
				<Text style={styles.title}>APP</Text>
			</View>

			<View style={styles.buttonContainer}>
				<View style={{ flexDirection: "row" }}>
					<Pressable
						onPress={() => navigation.navigate("Shifts")}
						style={styles.homeButton}
						// hover event model for onHoverIn and onHoverOut
						onHoverIn={(event) => {
							event.target.style.backgroundColor = "#2BBF7D";
						}}
						onHoverOut={(event) => {
							event.target.style.backgroundColor = "#147350";
						}}
					>
						<Image style={{ width: 100, height: 100 }} source={iconH} />
						<Text style={styles.buttonText}>Shifts</Text>
					</Pressable>
					<Pressable
						onPress={() => navigation.navigate("Employees")}
						style={styles.homeButton}
						onHoverIn={(event) => {
							event.target.style.backgroundColor = "#2BBF7D";
						}}
						onHoverOut={(event) => {
							event.target.style.backgroundColor = "#147350";
						}}
					>
						<Image style={{ width: 100, height: 100 }} source={iconE} />
						<Text style={styles.buttonText}>Employees</Text>
					</Pressable>
				</View>
				<View style={{ flexDirection: "row" }}>
					<Pressable
						onPress={() => navigation.navigate("Sells")}
						style={styles.homeButton}
						onHoverIn={(event) => {
							event.target.style.backgroundColor = "#2BBF7D";
						}}
						onHoverOut={(event) => {
							event.target.style.backgroundColor = "#147350";
						}}
					>
						<Image style={{ width: 100, height: 100 }} source={iconS} />
						<Text style={styles.buttonText}>Sells</Text>
					</Pressable>
					<Pressable
						onPress={() => navigation.navigate("Inventory")}
						style={styles.homeButton}
						onHoverIn={(event) => {
							event.target.style.backgroundColor = "#2BBF7D";
						}}
						onHoverOut={(event) => {
							event.target.style.backgroundColor = "#147350";
						}}
					>
						<Image style={{ width: 100, height: 100 }} source={iconI} />
						<Text style={styles.buttonText}>Inventory</Text>
					</Pressable>
				</View>
			</View>

			<StatusBar style="light" />
		</View>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerStyle: { backgroundColor: "#595959" },
					headerTintColor: "#F2F2F2",
				}}
			>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Shifts"
					component={Shifts}
					options={{ title: "Working Shifts" }}
				/>
				<Stack.Screen
					name="Employees"
					component={Employees}
					options={{ title: "Employees Management" }}
				/>
				<Stack.Screen
					name="Sells"
					component={Sells}
					options={{ title: "Sells Information" }}
				/>
				<Stack.Screen
					name="Inventory"
					component={Inventory}
					options={{ title: "Inventory Management" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F2F2F2",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	header: {
		width: "100%",
		height: 200,
		backgroundColor: "#595959",
		alignItems: "flex-start",
		justifyContent: "center",
		marginBottom: 40,
	},
	title: {
		fontSize: 35,
		color: "#F2F2F2",
		marginLeft: 40,
		fontWeight: "bold",
	},
	buttonContainer: {
		width: "70%",
		alignItems: "center",
		justifyContent: "space-between",
	},
	homeButton: {
		backgroundColor: "#147350",
		width: 150,
		height: 150,
		borderRadius: 16,
		margin: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "#F2F2F2",
		fontWeight: "bold",
	},
});
