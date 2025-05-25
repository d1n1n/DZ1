import { useRef, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";

export default function Index() {

  const [backColor, setBackColor] = useState("white");
  const [text, setText] = useState("");
  // const textRef = useRef(null);

  return (
    <View style={{ ...styles.container, backgroundColor: backColor }}>
      <Text style={styles.text}>Welcome to React Native</Text>

      <Text>Color:</Text>
      <TextInput style={styles.input} value={text} onChangeText={setText}></TextInput>

      <Button
        title="Click Me"
        onPress={() => {
          // alert("Button Pressed!");
          Alert.alert("Button Pressed!", "Do you want to change color?", [
            {
              text: "Reset",
              onPress: () => setBackColor("white"),
            },
            {
              text: "Yes",
              onPress: () => setBackColor(text || "lightgray"),
            },
            {
              text: "Ignore",
              onPress: () => console.log("Ignore Pressed"),
            },
            {
              text: "Fourth",
              onPress: () => console.log("4-th Pressed"),
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  }
});