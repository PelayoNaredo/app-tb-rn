import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DateSelector({ selectedDate, setSelectedDate }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDismiss = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (params) => {
    console.log("Date selected on picker:", params.date.toISOString().split("T")[0]); // Depuración: ver la fecha seleccionada
    if (params.date instanceof Date) {
      setSelectedDate(new Date(params.date)); // Asegurarse de que es un objeto Date
      setShowDatePicker(false);
    } else {
      console.error("Selected date is not a Date object");
    }
  };
  return (
    <View style={styles.datePickerContainer}>
      <Pressable style={styles.iconButton} onPress={() => setShowDatePicker(true)}>
        <Icon name="calendar-today" size={24} color="#fff" />
      </Pressable>
      <Text style={styles.selectedDate}>
        {selectedDate.toLocaleDateString('en-CA')}
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
    fontWeight: "bold",
    fontVariant: "italic",
  },
  iconButton: {
    padding: 10,
    backgroundColor: "#52a9ff",
    borderRadius: "50%",
  },
});
