import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import RegisterForm from "../components/regEmployeeForm";
import ShowEmployees from "../components/showEmployees";
import ManageAbsences from "../components/manageAbsences";
export default function Employees() {
  const [view, setView] = useState("showEmployees");

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Pressable
          onPress={() => setView("showEmployees")}
          style={[
            styles.switchButton,
            view === "showEmployees"
              ? styles.switchButtonActive
              : styles.switchButtonInactive,
          ]}
        >
          <Text style={styles.switchButtonText}>Show Employees</Text>
        </Pressable>
        <Pressable
          onPress={() => setView("registerEmployee")}
          style={[
            styles.switchButton,
            view === "registerEmployee"
              ? styles.switchButtonActive
              : styles.switchButtonInactive,
          ]}
        >
          <Text style={styles.switchButtonText}>Register Employee</Text>
        </Pressable>
        <Pressable
          onPress={() => setView("manageAbsences")}
          style={[
            styles.switchButton,
            view === "manageAbsences"
              ? styles.switchButtonActive
              : styles.switchButtonInactive,
          ]}
        >
          <Text style={styles.switchButtonText}>Manage Absences</Text>
        </Pressable>
      </View>
      <View style={styles.formContainer}>
        {view === "registerEmployee" && <RegisterForm />}
        {view === "showEmployees" && <ShowEmployees />}
        {view === "manageAbsences" && <ManageAbsences />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 24,
    marginBottom: 5,
    justifyContent: "center",
  },
  switchButton: {
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,

    paddingHorizontal: 10,
    borderRadius: 25,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  switchButtonActive: {
    backgroundColor: "blue",
  },
  switchButtonInactive: {
    backgroundColor: "gray",
  },
  switchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  formContainer: {
    flex: 1,
    width: "100%",
  },
});
