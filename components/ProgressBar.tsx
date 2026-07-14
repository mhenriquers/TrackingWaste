import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Animated } from "react-native";

interface ProgressBarProps {
  progress: number; // 0 a 100
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label = "Progresso",
}) => {
  const getBarColor = (): string => {
    if (progress < 33) return "#e74c3c";
    if (progress < 66) return "#f39c12";
    return "#41d606";
  };

  const animatedWidth = React.useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.percentage}>{Math.round(progress)}%</Text>
      </View>
      <View style={styles.barBackground}>
        <Animated.View
          style={[
            styles.barFill,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
              backgroundColor: getBarColor(),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  percentage: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#41d606",
  },
  barBackground: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#41d606",
    borderRadius: 4,
  },
});

export default ProgressBar;
