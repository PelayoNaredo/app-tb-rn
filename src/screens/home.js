import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-web";

// Define the icon size and style
const iconSize = 24;

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Business Management Dashboard</Text>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
      <View style={styles.grid}>
        <Card
          title="Employees"
          description="Manage your team, track attendance, and view performance."
          icon={require("../assets/icons/employeesLogo.png")} // Replace with the path to your PNG
          link="Manage Employees"
          navigation={navigation}
        />
        <Card
          title="Sales"
          description="Track your revenue, analyze sales trends, and generate reports."
          icon={require("../assets/icons/sellsLogo.png")} // Replace with the path to your PNG
          link="Manage Sales"
          navigation={navigation}
        />
        <Card
          title="Shifts"
          description="Schedule and manage employee shifts, breaks, and overtime."
          icon={require("../assets/icons/shiftsLogo.png")} // Replace with the path to your PNG
          link="Manage Shifts"
          navigation={navigation}
        />
        <Card
          title="Inventory"
          description="Track your stock levels, and manage orders."
          icon={require("../assets/icons/inventoryLogo.png")} // Replace with the path to your PNG
          link="Manage Inventory"
          navigation={navigation}
        />
        <Card
          title="Configuration"
          description="Customize your business settings and preferences."
          icon={require("../assets/icons/configLogo.png")} // Replace with the path to your PNG
          link="Manage Configuration"
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
}

function Card({ title, description, icon, link, navigation }) {
  return (
    <Pressable style={styles.card} onPress={() => navigation.navigate(title)}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <View style={styles.cardContent}>
        <Image source={icon} style={styles.iconStyle} />
      </View>

      <Text style={styles.link}>{link}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 3,
    border: "1px solid #ddd",
    marginBottom: 16,
    width: "48%",
    height: "270px",
    padding: 16,
    justifyContent: "space-between",
  },
  cardHeader: {
    marginBottom: 8,
  },
  iconStyle: {
    width: 100,
    height: 100,
    color: "#007BFF",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
  cardContent: {
    alignItems: "center",
    marginBottom: 8,
  },
  cardFooter: {
    alignItems: "center",
  },
  link: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#FF4D4D",
    padding: 10,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
