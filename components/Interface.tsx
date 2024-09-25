import { Animated, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import ProgressBar from 'react-native-progress/Bar';

interface InterfaceProps {
    scale: Animated.Value;
}

const Interface: React.FC<InterfaceProps> = ({ scale }) => {

    const [progress, setProgress] = useState(.75);

    const handleCorrect = () => {
        setProgress((prevProgress) => prevProgress + .25);
    }

    return (
        <View style={styles.container}>
            <ProgressBar progress={progress} width={200} height={10}  />
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
