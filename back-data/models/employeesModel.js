const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the employee schema
const employeeSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		phoneNumber: {
			type: String,
			required: true,
			trim: true,
		},
		position: {
			type: String,
			required: true,
			trim: true,
		},
		department: {
			type: String,
			trim: true,
		},
		hireDate: {
			type: Date,
			required: true,
		},
		salary: {
			type: Number,
			required: true,
			min: 0,
		},
		address: {
			street: {
				type: String,
				trim: true,
			},
			city: {
				type: String,
				trim: true,
			},
			postalCode: {
				type: String,
				trim: true,
			},
		},
		status: {
			type: String,
			enum: ["active", "inactive", "on_leave", "terminated"],
			default: "active",
		},
		emergencyContact: {
			name: {
				type: String,
				trim: true,
			},
			phoneNumber: {
				type: String,
				trim: true,
			},
		},
		dateOfBirth: {
			type: Date,
		},
		notes: {
			type: String,
			trim: true,
		},
	},
	{ timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Create the employee model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
