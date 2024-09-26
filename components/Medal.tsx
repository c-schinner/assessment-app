import { View, Animated, StyleSheet, Text } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { FontAwesome6 } from '@expo/vector-icons'

const Medal: React.FC = () => {
    const slideUpValue = useRef(new Animated.Value(300)).current;

    useEffect(() => {
            Animated.timing(slideUpValue, {
                toValue: -300,
                duration: 2000,
                useNativeDriver: true,
            }).start();
    }, [slideUpValue]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.medal, { transform: [{ translateY: slideUpValue }] }]}>
                <FontAwesome6 name="medal" size={100} color="gold" />
                <Text style={styles.congratsText}>Congrats!</Text>
                <Text style={styles.subText}>You have earned a New Badge!</Text>
            </Animated.View>
        </View>
    )
}

export default Medal

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
    },
    medal: {
        width: 100,
        height: 100,
    },
    congratsText: {
        marginTop: 15,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'green',
        textShadowColor: 'rgba(0, 0, 0, 0.75',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        width: '100%',
    },
    subText: {
        marginTop: 5,
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
})