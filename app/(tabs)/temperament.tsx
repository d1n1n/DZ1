import React, { useState, useEffect } from 'react';
import { View, Button, Alert, StyleSheet, Text } from 'react-native';

const questions = [
  { question: 'Do you like socializing?', type: 'sanguine' },
  { question: 'Are you often emotional?', type: 'melancholic' },
  { question: 'Do you get angry quickly?', type: 'choleric' },
  { question: 'Do you prefer calm and quiet?', type: 'phlegmatic' },
];

const temperamentNames: Record<string, string> = {
  sanguine: 'Сангвінік',
  melancholic: 'Меланхолік',
  choleric: 'Холерик',
  phlegmatic: 'Флегматик',
};

export default function TemperamentSimple() {
  const [index, setIndex] = useState(-1);  
  const [scores, setScores] = useState({
    sanguine: 0,
    melancholic: 0,
    choleric: 0,
    phlegmatic: 0,
  });

  useEffect(() => {
    if (index === -1) return;  

    if (index >= questions.length) {

      const result = Object.entries(scores).reduce((a, b) =>
        b[1] > a[1] ? b : a
      );
      Alert.alert('Ваш темперамент:', temperamentNames[result[0]]);
      // Reset
      setIndex(-1);
      setScores({
        sanguine: 0,
        melancholic: 0,
        choleric: 0,
        phlegmatic: 0,
      });
      return;
    }

    Alert.alert(
      'Питання',
      questions[index].question,
      [
        {
          text: 'Так',
          onPress: () => {
            const newScores = { ...scores };
            newScores[questions[index].type]++;
            setScores(newScores);
            setIndex(index + 1);
          },
        },
        {
          text: 'Ні',
          onPress: () => {
            setIndex(index + 1);
          },
        },
      ],
      { cancelable: false }
    );
  }, [index]);

  return (
    <View style={styles.container}>
      <Button title="Старт" onPress={() => setIndex(0)} />
      <Text style={styles.instructions}>Натисніть «Старт» щоб почати тест.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  instructions: { marginTop: 20, textAlign: 'center', fontSize: 16 },
});
