import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const ShiftRow = ({ employee, shifts, timeSlots, saveShift, selectedDate, keyProp }) => {
  const isWorking = (employeeId, time) => {
    return (
      shifts[employeeId]?.some((shift) => {
        const { startTime, endTime } = shift;
        return time >= startTime && time < endTime;
      }) || false
    ); 
  };

  const toggleShift = (employeeId, time) => {
    const employeeShifts = shifts[employeeId] || [];
    let newShifts;

    if (isWorking(employeeId, time)) {
      // Remove the shift
      newShifts = employeeShifts.filter((shift) => {
        const { startTime, endTime } = shift;
        return time < startTime || time >= endTime;
      });
    } else {
      // Add a new shift
      const endTime = timeSlots[timeSlots.indexOf(time) + 1] || "00:00";
      const newShift = { startTime: time, endTime };
      newShifts = [...employeeShifts, newShift];
    }

    saveShift(employeeId, selectedDate.toLocaleDateString('en-CA'), newShifts);
  };

  const calculateTotalHours = (employeeId) => {
    let totalMinutes = 0;
    (shifts[employeeId] || []).forEach((shift) => {
      const { startTime, endTime } = shift;
      const startDate = new Date(`2023-01-01 ${startTime}`);
      const endDate = new Date(`2023-01-01 ${endTime}`);
      totalMinutes += (endDate.getTime() - startDate.getTime()) / (1000 * 60);
    });
    return (totalMinutes / 60).toFixed(1);
  };

  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>
        {employee} ({calculateTotalHours(keyProp)}h)
      </Text>
      {timeSlots.map((time) => (
        <Pressable
          key={`${keyProp}-${time}`}
          style={[
            styles.tableCell,
            isWorking(keyProp, time) ? styles.workingCell : {},
          ]}
          onPress={() => toggleShift(keyProp, time)}
        >
          {/* Empty cell for visual feedback */}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableCell: {
    width: 70,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  workingCell: {
    backgroundColor: "#a0e6a0",
  },
});

export default ShiftRow;