import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	TouchableHighlight,
} from "react-native";
const logo = require("./assets/icon.png");
export default function App() {
	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: "https://i.3djuegos.com/juegos/13394/prey__2016_/fotos/ficha/prey__2016_-3417785.webp",
				}}
				style={{ width: 200, height: 300 }}
			/>
			<Text style={styles.titulo}>Hola mundo!</Text>
			<Button title="ojo" onPress={() => alert("Cuidao")} />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	titulo: {
		fontSize: 30,
	},
});
