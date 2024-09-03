import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";

export default function DateSelector({ selectedDate, setSelectedDate }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDismiss = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (params) => {
    setShowDatePicker(false);
    setSelectedDate(params.date);
  };

  return (
    <View style={styles.datePickerContainer}>
      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      <Text style={styles.selectedDate}>
        Selected Date: {selectedDate.toLocaleDateString()}
      </Text>
      <DatePickerModal
        visible={showDatePicker}
        onDismiss={onDismiss}
        date={selectedDate}
        onConfirm={onConfirm}
        label="Select date"
        mode="single"
        presentationStyle="fullScreen"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  selectedDate: {
    marginLeft: 10,
    fontSize: 16,
  },
});
