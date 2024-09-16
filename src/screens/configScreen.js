import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
  Image
} from "react-native";

const SettingsScreen = () => {
  const [openingHours, setOpeningHours] = useState({
    monday: { start: "09:00", end: "17:00" },
    tuesday: { start: "09:00", end: "17:00" },
    wednesday: { start: "09:00", end: "17:00" },
    thursday: { start: "09:00", end: "17:00" },
    friday: { start: "09:00", end: "17:00" },
    saturday: { start: "09:00", end: "17:00" },
    sunday: { start: "09:00", end: "17:00" },
  });
  const [selectedDay, setSelectedDay] = useState(null);
  const [employeesBudget, setEmployeesBudget] = useState("");
  const [stockBudget, setStockBudget] = useState("");
  const [minWorkingHours, setMinWorkingHours] = useState("00:00");
  const [maxWorkingHours, setMaxWorkingHours] = useState("24:00");
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState(""); // URL or path to the logo image
  const [companyAddress, setCompanyAddress] = useState("");

  const formatTime = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (regex.test(time)) {
      return time;
    }
    return "00:00";
  };

  const handleBlur = (type) => {
    setOpeningHours((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [type]: formatTime(openingHours[selectedDay][type]),
      },
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", {
      openingHours,
      employeesBudget,
      stockBudget,
      minWorkingHours,
      maxWorkingHours,
      companyName,
      companyLogo,
      companyAddress,
    });
  };

  const handleMinTimeBlur = () => {
    setMinWorkingHours(formatTime(minWorkingHours));
  };

  const handleMaxTimeBlur = () => {
    setMaxWorkingHours(formatTime(maxWorkingHours));
  };

  const handleLogoUpload = () => {
    // Implement logo upload logic here
    // For example, use a file picker or image picker
    console.log("Upload logo");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company Info</Text>
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={companyName}
          onChangeText={setCompanyName}
        />
        <View style={styles.logoContainer}>
          {companyLogo ? (
            <Image
              source={{ uri: companyLogo }}
              style={styles.logo}
            />
          ) : (
            <Text>No logo uploaded</Text>
          )}
          <Pressable onPress={handleLogoUpload} style={styles.uploadButton}>
            <Text style={styles.buttonText}>Upload Logo</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Company Address"
          value={companyAddress}
          onChangeText={setCompanyAddress}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Open Hours</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderTextDay}>Day</Text>
            <Text style={styles.tableHeaderText}>Start</Text>
            <Text style={styles.tableHeaderText}>End</Text>
          </View>
          {Object.keys(openingHours).map((day) => (
            <View key={day} style={styles.tableRow}>
              <Text style={styles.tableCell}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Text>
              <TextInput
                style={styles.tableInput}
                placeholder="(HH:mm)"
                value={openingHours[day].start}
                onChangeText={(text) => {
                  setSelectedDay(day);
                  setOpeningHours((prev) => ({
                    ...prev,
                    [day]: {
                      ...prev[day],
                      start: text,
                    },
                  }));
                }}
                onBlur={() => handleBlur("start")}
                keyboardType="numeric"
                maxLength={5} // Formato HH:mm
              />
              <TextInput
                style={styles.tableInput}
                placeholder="(HH:mm)"
                value={openingHours[day].end}
                onChangeText={(text) => {
                  setSelectedDay(day);
                  setOpeningHours((prev) => ({
                    ...prev,
                    [day]: {
                      ...prev[day],
                      end: text,
                    },
                  }));
                }}
                onBlur={() => handleBlur("end")}
                keyboardType="numeric"
                maxLength={5} // Formato HH:mm
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Working Hours</Text>
        <Text style={styles.subText}>Set Min. and Max. working hours.</Text>
        <Text style={styles.subText}>"This will affect all shifts."</Text>
        <View style={styles.timeContainer}>
          <TextInput
            style={styles.tableInput}
            placeholder="Min (HH:mm)"
            value={minWorkingHours}
            onChangeText={setMinWorkingHours}
            onBlur={handleMinTimeBlur}
            keyboardType="numeric"
            maxLength={5}
          />
          <TextInput
            style={styles.tableInput}
            placeholder="Max (HH:mm)"
            value={maxWorkingHours}
            onChangeText={setMaxWorkingHours}
            onBlur={handleMaxTimeBlur}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budgets</Text>

        <Text style={styles.labelText}>Employees:</Text>
        <TextInput
          style={styles.input}
          placeholder="$00000.00"
          value={employeesBudget}
          onChangeText={setEmployeesBudget}
        />

        <Text style={styles.labelText}>Stock:</Text>
        <TextInput
          style={styles.input}
          placeholder="$00000.00"
          value={stockBudget}
          onChangeText={setStockBudget}
        />
      </View>

      <Pressable onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.buttonText}>Guardar Configuración</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  uploadButton: {
    marginTop: 8,
  },
  uploadButtonText: {
    color: "#007BFF",
    fontSize: 16,
  },
  table: {
    paddingHorizontal: 4,
    width: "90%",
    margin: "auto",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  timeContainer:{
    flexDirection: "row",
    marginTop: 8,
    justifyContent:"space-evenly"
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  tableHeaderText: {
    textAlign: "center",
    fontWeight: "bold",
    width: 80,
  },
  tableHeaderTextDay: {
    width: 90,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  tableCell: {
    width: 90,
    textAlign: "center",
  },
  tableInput: {
    width: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    textAlign: "center",
  },
  labelText: {
    flex: 1,
    fontWeight: "bold",
  },
  uploadButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#0056b3',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#1e7e34',
    borderWidth: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
});
export default SettingsScreen;