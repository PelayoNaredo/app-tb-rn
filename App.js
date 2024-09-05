import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Shifts from "./src/screens/shifts.js";
import Employees from "./src/screens/employees.js";
import Sales from "./src/screens/sales.js";
import Inventory from "./src/screens/inventory.js";
import LoginScreen from "./src/screens/loginScreen.js";
import RegisterScreen from "./src/screens/registerScreen.js";
import HomeScreen from "./src/screens/home.js";

const Stack = createNativeStackNavigator();

export default function AppStart() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);

      try {
        const token = await AsyncStorage.getItem("userToken");

        if (token) {
          const response = await fetch(
            "http://localhost:3030/users/verify-token",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            await AsyncStorage.removeItem("userToken");
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.error("Error checking token:", e);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem("userToken");
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#008732" },
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
            name="Sales"
            component={Sales}
            options={{ title: "Sales Information" }}
          />
          <Stack.Screen
            name="Inventory"
            component={Inventory}
            options={{ title: "Inventory Management" }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: "#595959" },
            headerTintColor: "#fff",
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
