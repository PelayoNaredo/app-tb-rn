// EmployeeForm.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSubmitEmployee } from "../hooks/useSubmitEmployee";

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
  });
  const [status, setStatus] = useState("active");
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    phoneNumber: "",
  });
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [notes, setNotes] = useState("");

  const { submitEmployee, loading, errorMessage } = useSubmitEmployee();

  const handleSubmit = () => {
    submitEmployee({
      firstName,
      lastName,
      email,
      phoneNumber,
      position,
      department,
      hireDate,
      salary,
      address,
      status,
      emergencyContact,
      dateOfBirth,
      notes,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ width: "100%", marginBottom: 20 }}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          inputMode="email"
        />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          inputMode="tel"
        />

        <Text style={styles.label}>Position:</Text>
        <TextInput
          style={styles.input}
          value={position}
          onChangeText={setPosition}
        />

        <Text style={styles.label}>Department:</Text>
        <TextInput
          style={styles.input}
          value={department}
          onChangeText={setDepartment}
        />

        <Text style={styles.label}>Hire Date (YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          value={hireDate}
          onChangeText={setHireDate}
          placeholder="e.g., 2024-08-29"
        />

        <Text style={styles.label}>Salary:</Text>
        <TextInput
          style={styles.input}
          value={salary}
          onChangeText={setSalary}
          inputMode="numeric"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <TextInput
          style={styles.input}
          value={address.street}
          onChangeText={(text) => setAddress({ ...address, street: text })}
          placeholder="Street"
        />
        <TextInput
          style={styles.input}
          value={address.city}
          onChangeText={(text) => setAddress({ ...address, city: text })}
          placeholder="City"
        />
        <TextInput
          style={styles.input}
          value={address.postalCode}
          onChangeText={(text) => setAddress({ ...address, postalCode: text })}
          placeholder="Postal Code"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={status}
            style={styles.picker}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Active" value="active" />
            <Picker.Item label="Inactive" value="inactive" />
            <Picker.Item label="On Leave" value="on_leave" />
            <Picker.Item label="Terminated" value="terminated" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={emergencyContact.name}
          onChangeText={(text) =>
            setEmergencyContact({ ...emergencyContact, name: text })
          }
        />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={emergencyContact.phoneNumber}
          onChangeText={(text) =>
            setEmergencyContact({ ...emergencyContact, phoneNumber: text })
          }
          inputMode="tel"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Information</Text>
        <Text style={styles.label}>Date of Birth (YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder="XXXX-XX-XX"
        />

        <Text style={styles.label}>Notes:</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>

      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register Employee</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "70%",
    alignItems: "center",
    margin: "auto",
    padding: 16,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#f6f6f6",
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#fff",
  },
  notesInput: {
    height: 100,
    verticalAlign: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginBottom: 12,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  errorContainer: {
    backgroundColor: "#fdd",
    borderColor: "#fbb",
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#d8000c",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EmployeeForm;
