import { Animated, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface InterfaceProps {
    scale: Animated.Value;
}

const Interface: React.FC<InterfaceProps> = ({ scale }) => {

    return (
        <View style={styles.container}>
            <View style={styles.progress} />
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
    progress: {
        width: 200,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 10,
        height: 20,
    },
})
