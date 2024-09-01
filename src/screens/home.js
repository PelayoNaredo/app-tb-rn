import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";

const iconH = require("../assets/icons/hourLogo.png");
const iconE = require("../assets/icons/employLogo.png");
const iconS = require("../assets/icons/sellsLogo.png");
const iconI = require("../assets/icons/inventoryLogo.png");

export default function HomeScreen({ navigation }) {
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
