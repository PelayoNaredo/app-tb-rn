import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthContext, { AuthProvider } from './AuthContext';
import Shifts from './src/screens/shifts';
import Employees from './src/screens/employees';
import Sales from './src/screens/sales';
import Inventory from './src/screens/inventory';
import LoginScreen from './src/screens/loginScreen';
import RegisterScreen from './src/screens/registerScreen';
import HomeScreen from './src/screens/home';
import ErrorScreen from './src/screens/errorScreen';
import ConfigScreen from './src/screens/configScreen'

const Stack = createNativeStackNavigator();

function AppStart() {
  const { isAuthenticated } = React.useContext(AuthContext);
  console.log('auth:', isAuthenticated)

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator
        initialRouteName={isAuthenticated ? "Home" : "Login"}
        screenOptions={{
          headerStyle: isAuthenticated ? { backgroundColor: '#008732' } : { backgroundColor: '#595959' },
          headerTintColor: isAuthenticated ? '#F2F2F2' : '#fff',
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
            options={{ title: 'Working Shifts' }}
          />
          <Stack.Screen
            name="Employees"
            component={Employees}
            options={{ title: 'Employees Management' }}
          />
          <Stack.Screen
            name="Sales"
            component={Sales}
            options={{ title: 'Sales Information' }}
          />
          <Stack.Screen
            name="Inventory"
            component={Inventory}
            options={{ title: 'Inventory Management' }}
          />
          <Stack.Screen
            name="Configuration"
            component={ConfigScreen}
            options={{ title: 'App Configuration' }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#595959' },
            headerTintColor: '#fff',
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
            component={ErrorScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppStart />
    </AuthProvider>
  );
}