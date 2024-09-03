import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Timeline from "../components/ShiftManager";

export default function Shifts() {
  return (
    <PaperProvider>
      <Timeline />
    </PaperProvider>
  );
}
