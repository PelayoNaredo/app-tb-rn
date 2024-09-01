import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Timeline from "../components/timeline"; // Your main timeline

export default function shifts() {
	return (
		<PaperProvider>
			<Timeline />
		</PaperProvider>
	);
}
