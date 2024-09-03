import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ShiftRow = ({ employee, shifts, timeSlots, saveShift, selectedDate }) => {
  const isWorking = (employee, time) => {
    return (
      shifts[employee]?.some((shift) => {
        const { startTime, endTime } = shift;
        return time >= startTime && time < endTime;
      }) || false
    ); // Devuelve false si no hay turnos para el empleado
  };

  const toggleShift = (employee, time) => {
    const employeeShifts = shifts[employee] || [];
    let newShifts;

    if (isWorking(employee, time)) {
      newShifts = employeeShifts.filter((shift) => {
        const { startTime, endTime } = shift;
        return time < startTime || time >= endTime;
      });
    } else {
      const endTime = timeSlots[timeSlots.indexOf(time) + 1] || "00:00";
      const newShift = { startTime: time, endTime };
      newShifts = [...employeeShifts, newShift];
    }

    saveShift(employee, selectedDate.toISOString().split("T")[0], newShifts);
  };

  const calculateTotalHours = (employee) => {
    let totalMinutes = 0;
    (shifts[employee] || []).forEach((shift) => {
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
        {employee} ({calculateTotalHours(employee)}h)
      </Text>
      {timeSlots.map((time) => (
        <TouchableOpacity
          key={`${employee}-${time}`}
          style={[
            styles.tableCell,
            isWorking(employee, time) ? styles.workingCell : {},
          ]}
          onPress={() => toggleShift(employee, time)}
        >
          {/* Empty cell for visual feedback */}
        </TouchableOpacity>
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
