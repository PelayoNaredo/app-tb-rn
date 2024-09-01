import React, { useState, useMemo } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Button,
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { Provider as PaperProvider } from "react-native-paper";

const generateTimeSlots = (start = "00:00", end = "23:30", interval = 30) => {
	const slots = [];
	const startTime = new Date(`1970-01-01T${start}:00`);
	const endTime = new Date(`1970-01-01T${end}:00`);

	while (startTime <= endTime) {
		const hours = String(startTime.getHours()).padStart(2, "0");
		const minutes = String(startTime.getMinutes()).padStart(2, "0");
		slots.push(`${hours}:${minutes}`);
		startTime.setMinutes(startTime.getMinutes() + interval);
	}

	return slots;
};

const timeSlots = generateTimeSlots();

const employees = ["Alice", "Bob", "Charlie", "David"];

const initialShifts = {
	Alice: ["08:00-12:00", "12:30-16:30"],
	Bob: ["10:00-14:00", "14:30-18:30"],
	Charlie: ["09:00-13:00", "13:30-17:30"],
	David: ["11:00-15:00", "15:30-19:30"],
};

export default function Component() {
	const [shifts, setShifts] = useState(initialShifts);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

	const isWorking = (employee, time) => {
		return shifts[employee].some((shift) => {
			const [start, end] = shift.split("-");
			return time >= start && time < end;
		});
	};

	const toggleShift = (employee, time) => {
		setShifts((prevShifts) => {
			const newShifts = { ...prevShifts };
			const employeeShifts = [...newShifts[employee]];

			if (isWorking(employee, time)) {
				newShifts[employee] = employeeShifts.filter((shift) => {
					const [start, end] = shift.split("-");
					return time < start || time >= end;
				});
			} else {
				const endTime = timeSlots[timeSlots.indexOf(time) + 1] || "00:00";
				newShifts[employee] = [...employeeShifts, `${time}-${endTime}`];
			}

			return newShifts;
		});
	};

	const saveChanges = () => {
		console.log("Saving shifts:", shifts);
	};

	const employeeCount = useMemo(() => {
		return timeSlots.map((time) => ({
			time,
			count: employees.filter((employee) => isWorking(employee, time)).length,
		}));
	}, [shifts]);

	const calculateTotalHours = (employee) => {
		let totalMinutes = 0;
		shifts[employee].forEach((shift) => {
			const [start, end] = shift.split("-");
			const startDate = new Date(`2023-01-01 ${start}`);
			const endDate = new Date(`2023-01-01 ${end}`);
			totalMinutes += (endDate.getTime() - startDate.getTime()) / (1000 * 60);
		});
		return (totalMinutes / 60).toFixed(1);
	};

	const onDismiss = () => {
		setShowDatePicker(false);
	};

	const onConfirm = (params) => {
		setShowDatePicker(false);
		setSelectedDate(params.date);
	};

	return (
		<PaperProvider>
			<View style={styles.container}>
				{/* Selector de Fecha */}
				<View style={styles.datePickerContainer}>
					<Button title="Select Date" onPress={() => setShowDatePicker(true)} />
					<Text style={styles.selectedDate}>
						Selected Date: {selectedDate.toLocaleDateString()}
					</Text>
				</View>
				<DatePickerModal
					visible={showDatePicker}
					onDismiss={onDismiss}
					date={selectedDate}
					onConfirm={onConfirm}
					label="Select date"
					mode="single"
					presentationStyle="fullScreen"
				/>

				<Text style={styles.title}>Editable Employee Workshift Timetable</Text>
				<ScrollView horizontal style={styles.tableContainer}>
					<View>
						<View style={styles.tableRow}>
							<Text style={styles.tableHead}>Employee (Hours)</Text>
							{employeeCount.map(({ time, count }) => (
								<Text key={time} style={styles.tableHead}>
									{time}
									{"\n"}
									{count} 👤
								</Text>
							))}
						</View>
						{employees.map((employee) => (
							<View key={employee} style={styles.tableRow}>
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
						))}
					</View>
				</ScrollView>
				<Button title="Save Changes" onPress={saveChanges} />
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	datePickerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	selectedDate: {
		marginLeft: 10,
		fontSize: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
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
	datePickerModal: {
		maxHeight: 600,
	},
});
