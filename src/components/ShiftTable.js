import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ShiftRow from "./ShiftRow";

export default function ShiftTable({
  shifts,
  timeSlots,
  employees,
  selectedDate,
  saveShift,
}) {
  return (
    <ScrollView horizontal style={styles.tableContainer}>
      <View>
        <View style={styles.tableRow}>
          <Text style={styles.tableHead}>Employee (Hours)</Text>
          {timeSlots.map((time) => (
            <Text key={time} style={styles.tableHead}>
              {time}
            </Text>
          ))}
        </View>
        {employees.map((employee) => (
          <ShiftRow
            key={employee.id}
            employee={employee.name}
            shifts={shifts}
            timeSlots={timeSlots}
            saveShift={saveShift}
            selectedDate={selectedDate}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableHead: {
    width: 70,
    height: 60,
    textAlign: "center",
    fontWeight: "bold",
  },
});
