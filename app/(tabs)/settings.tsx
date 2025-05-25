import { useRef, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";

export default function Settings() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>

      <Button
        title="Go Back"
        onPress={() => {
          Alert.alert("Go Back", "Do you want to go back?", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "black",
  },
});