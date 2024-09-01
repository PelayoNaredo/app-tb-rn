import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Shifts from "./src/screens/shifts.js";
import Employees from "./src/screens/employees.js";
import Sells from "./src/screens/sells.js";
import Inventory from "./src/screens/inventory.js";
import LoginScreen from "./src/screens/loginScreen.js";
import RegisterScreen from "./src/screens/registerScreen.js";
import HomeScreen from "./src/screens/home.js";

const Stack = createNativeStackNavigator();

export default function AppStart() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={{
					headerStyle: { backgroundColor: "#595959" },
					headerTintColor: "#F2F2F2",
				}}
			>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Register"
					component={RegisterScreen}
					options={{ headerShown: false }}
				/>
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
