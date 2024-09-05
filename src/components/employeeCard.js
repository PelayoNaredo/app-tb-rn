import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";

const EmployeeCard = ({ employee, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });
  const { updateEmployee } = useUpdateEmployee(onUpdate);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "#4CAF50"; // Green
      case "inactive":
        return "#9E9E9E"; // Gray
      case "on_leave":
        return "#FF9800"; // Orange
      case "terminated":
        return "#F44336"; // Red
      default:
        return "#9E9E9E"; // Default to gray
    }
  };

  const handleSave = async () => {
    await updateEmployee(editedEmployee);
    setIsEditing(false);
  };

  return (
    <View style={styles.card}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={editedEmployee.firstName}
            onChangeText={(text) =>
              setEditedEmployee({ ...editedEmployee, firstName: text })
            }
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            value={editedEmployee.lastName}
            onChangeText={(text) =>
              setEditedEmployee({ ...editedEmployee, lastName: text })
            }
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            value={editedEmployee.email}
            onChangeText={(text) =>
              setEditedEmployee({ ...editedEmployee, email: text })
            }
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={editedEmployee.phoneNumber}
            onChangeText={(text) =>
              setEditedEmployee({ ...editedEmployee, phoneNumber: text })
            }
            placeholder="Phone Number"
          />
          <TextInput
            style={styles.input}
            value={editedEmployee.position}
            onChangeText={(text) =>
              setEditedEmployee({ ...editedEmployee, position: text })
            }
            placeholder="Role"
          />
          <TextInput
            style={styles.input}
            value={editedEmployee.department}
            onChangeText={(text) =>
              setEditedEmployee({ ...editedEmployee, department: text })
            }
            placeholder="Department"
          />
          <TextInput
            style={styles.input}
            value={editedEmployee.salary}
            onChangeText={(text) =>
              setEditedEmployee({ ...editedEmployee, salary: text })
            }
            placeholder="Salary"
          />
          <Picker
            selectedValue={editedEmployee.status}
            style={styles.picker}
            onValueChange={(value) =>
              setEditedEmployee({ ...editedEmployee, status: value })
            }
          >
            <Picker.Item label="Active" value="active" />
            <Picker.Item label="Inactive" value="inactive" />
            <Picker.Item label="On Leave" value="on_leave" />
            <Picker.Item label="Terminated" value="terminated" />
          </Picker>
          <TextInput
            style={styles.input}
            value={editedEmployee.notes}
            onChangeText={(text) =>
              setEditedEmployee({ ...editedEmployee, notes: text })
            }
            placeholder="Notes"
          />

          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Icon name="user" size={40} color="#999" />
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>
                  {employee.firstName} {employee.lastName}
                </Text>

                <Text style={styles.positionText}>{employee.position}</Text>
              </View>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getStatusColor(employee.status) },
                  ]}
                />
                <Text style={styles.statusText}>{employee.status}</Text>
              </View>
            </View>
            <Pressable
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Icon name="edit" size={20} color="#555" />
            </Pressable>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{employee.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{employee.phoneNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Department:</Text>
              <Text style={styles.value}>{employee.department}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Hire Date:</Text>
              <Text style={styles.value}>
                {employee.hireDate.split("T")[0]}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Salary:</Text>
              <Text style={styles.value}>{employee.salary}$/€</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Notes:</Text>
            </View>
            <Text style={styles.value}>{employee.notes}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    boxShadow: "0 0.1 5 #000",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameContainer: {
    marginLeft: 8,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statusContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    textTransform: "capitalize",
    fontSize: 18,
    color: "#777",
  },
  positionText: {
    fontSize: 14,
    color: "#777",
  },
  editButton: {
    padding: 8,
    borderRadius: 4,
  },
  infoContainer: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#333",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "blue",
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    width: "100%",
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
});

export default EmployeeCard;
