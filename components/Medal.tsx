import { View, Animated, StyleSheet } from 'react-native'
import React, { useRef, useEffect } from 'react'

const Medal = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.medal, { transform: [{ rotate: spin }] }]}>
                {insert medal image}
            </Animated.View>
        </View>
    )
}

export default Medal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    medal: {
        width: 100,
        height: 100,
    },
})