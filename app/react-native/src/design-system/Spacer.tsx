import { View } from "react-native";
import { gridSize } from "./index";

// Spacer component for vertical spacing
interface SpacerProps {
  height?: number; // multiplier for grid size, default is 2
}

export const Spacer: React.FC<SpacerProps> = ({ height = 2 }) => {
  return <View style={{ height: gridSize * height }} />;
};