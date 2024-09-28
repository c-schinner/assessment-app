import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import QuizInterface from './components/QuizInterface';

const App: React.FC = () => {
  const scaleSizing = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.timing(scaleSizing, { 
      toValue: 1,
      duration: 1500, 
      useNativeDriver: true 
    }).start();
  }, []);

  const animatedStyle: StyleProp<ViewStyle> = {
    transform: [{ 
      scale: scaleSizing.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1]
    }) }],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle]}>
        <QuizInterface scale={scaleSizing} />
      </Animated.View>
      <StatusBar style="auto" />
    </View>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
