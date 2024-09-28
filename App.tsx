import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import QuizInterface from './components/QuizInterface';

export default function App() {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.timing(scale, { toValue: 1, duration: 1500, useNativeDriver: true }).start();
  }, []);

  const animatedStyle = {
    transform: [{ 
      scale: scale.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1]
    }) }],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle]}>
        <QuizInterface scale={scale} />
      </Animated.View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
