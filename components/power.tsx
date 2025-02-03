import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

export default function TypingAnimationExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Typing Animation Example</Text>
      <View style={styles.dotsContainer}>
        <Animatable.Text
          animation="fadeIn"
          iterationCount="infinite"
          direction="alternate"
          duration={500}
          style={styles.dot}
        >
          .
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          iterationCount="infinite"
          direction="alternate"
          duration={500}
          delay={200}
          style={styles.dot}
        >
          .
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          iterationCount="infinite"
          direction="alternate"
          duration={500}
          delay={400}
          style={styles.dot}
        >
          .
        </Animatable.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: "row",
  },
  dot: {
    fontSize: 24,
    marginHorizontal: 5,
  },
});