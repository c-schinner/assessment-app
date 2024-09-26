import { Animated, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import Body from './Body';

interface InterfaceProps {
    scale: Animated.Value;
}

const Interface: React.FC<InterfaceProps> = ({ scale }) => {
    // Define the progress bar initial state to 75%
    const [progress, setProgress] = useState<number>(.75);

    // If the answer is correct, the progress bar will fill completely
    const handleCorrect = () => {
        setProgress((prevProgress) => Math.min(prevProgress + .25, 1));
    }

    const question = 'What is the correct way to log a message on the screen?';
    const answers = [
        "console.log('message');", 
        "print('message')", 
        "const console.log('message');", 
        "consoleLog('message');"];
    const correctAnswer = "console.log('message')";

    return (
        <View style={styles.container}>
            <ProgressBar progress={progress} width={200} height={10}  />
            <Body 
                question={question}
                answers={answers}
                correctAnswer={correctAnswer}
                onCorrect={handleCorrect} />
        </View>
    );
}

export default Interface

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 70,
        justifyContent: 'flex-start',
    },

})
