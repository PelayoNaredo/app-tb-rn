import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Picker,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import DatePicker from "react-native-ui-datepicker";

const employees = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Bob Johnson" },
]; // Simulated employee data; replace with real data if available.

export default function ManageAbsences() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [absenceType, setAbsenceType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [specialConditions, setSpecialConditions] = useState({
    freeDaysPerWeek: 0,
    weekendFreeInterval: "",
  });

  const handleSpecialConditionChange = (key, value) => {
    setSpecialConditions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Manage Absences</Text>

      <Text style={styles.subTitle}>Select Employee:</Text>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text
            style={[
              styles.employeeItem,
              selectedEmployee === item.id ? styles.selectedEmployeeItem : null,
            ]}
            onPress={() => setSelectedEmployee(item.id)}
          >
            {item.name}
          </Text>
        )}
      />

      {selectedEmployee && (
        <>
          <Text style={styles.subTitle}>Select Absence Type:</Text>
          <Picker
            selectedValue={absenceType}
            style={styles.picker}
            onValueChange={(itemValue) => setAbsenceType(itemValue)}
          >
            <Picker.Item label="Select an absence type..." value="" />
            <Picker.Item label="Vacations" value="vacations" />
            <Picker.Item label="Sick Leave" value="sickLeave" />
            <Picker.Item label="Absenteeism" value="absenteeism" />
            <Picker.Item label="Illness" value="illness" />
          </Picker>

          {/* Date Pickers for Absence Duration */}
          <Text style={styles.subTitle}>Select Start Date:</Text>
          <DatePicker
            date={startDate}
            onDateChange={setStartDate}
            mode="date"
            style={styles.datePicker}
          />

          <Text style={styles.subTitle}>Select End Date:</Text>
          <DatePicker
            date={endDate}
            onDateChange={setEndDate}
            mode="date"
            style={styles.datePicker}
          />
        </>
      )}

      <View style={styles.specialConditionsContainer}>
        <Text style={styles.subTitle}>Special Conditions:</Text>

        <Text style={styles.conditionLabel}>Free Days Per Week:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(specialConditions.freeDaysPerWeek)}
          onChangeText={(value) =>
            handleSpecialConditionChange(
              "freeDaysPerWeek",
              parseInt(value) || 0
            )
          }
        />

        <Text style={styles.conditionLabel}>Weekend Free Interval:</Text>
        <Picker
          selectedValue={specialConditions.weekendFreeInterval}
          style={styles.picker}
          onValueChange={(itemValue) =>
            handleSpecialConditionChange("weekendFreeInterval", itemValue)
          }
        >
          <Picker.Item label="Select an interval..." value="" />
          <Picker.Item label="Monthly" value="monthly" />
          <Picker.Item label="Bimonthly" value="bimonthly" />
          <Picker.Item label="Quarterly" value="quarterly" />
        </Picker>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  employeeItem: {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    marginBottom: 5,
    borderRadius: 5,
    textAlign: "center",
  },
  selectedEmployeeItem: {
    backgroundColor: "#d0e0ff",
  },
  picker: {
    height: 40,
    borderColor: "#fff",
    borderRadius: 5,
    textAlign: "center",
    width: "100%",
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
  },
  datePicker: {
    width: "100%",
    marginBottom: 20,
  },
  specialConditionsContainer: {
    marginTop: 30,
  },
  conditionLabel: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
