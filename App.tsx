import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.timing(scale, { toValue: 1, duration: 1500, useNativeDriver: true }).start();
  }, []);

  const animatedStyle = {
    transform: [{ scale }],
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, animatedStyle]}>
        Here is our assessment project!
      </Animated.Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
