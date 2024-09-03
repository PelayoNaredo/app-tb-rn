import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import DateSelector from "./DateSelector";
import ShiftTable from "./ShiftTable";
import { useShifts } from "../hooks/useShifts";
import { generateTimeSlots } from "../utils/generateTimeSlots";
import useFetchEmployees from "../hooks/useFetchEmployees";

export default function ShiftManager() {
  const {
    shifts,
    loading: shiftsLoading,
    fetchShiftsByDate,
    saveShift,
  } = useShifts();
  const {
    employees,
    loading: employeesLoading,
    error: employeesError,
  } = useFetchEmployees();

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchShiftsByDate(selectedDate.toISOString().split("T")[0]);
  }, [selectedDate]);

  const isLoading = shiftsLoading || employeesLoading;
  const hasError = employeesError;

  return (
    <PaperProvider>
      <View style={styles.container}>
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <Text style={styles.title}>Editable Employee Workshift Timetable</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : hasError ? (
          <Text>Error fetching employees</Text>
        ) : (
          <ShiftTable
            shifts={shifts}
            timeSlots={generateTimeSlots()}
            employees={employees}
            selectedDate={selectedDate}
            saveShift={saveShift}
          />
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
