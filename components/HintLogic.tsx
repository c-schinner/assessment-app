import {
    StyleSheet,
    Animated,
    TouchableOpacity,
    View,
    Text,
} from "react-native";
import React, { useRef } from "react";

interface HintLogicProps {
    visible: boolean;
    message: string;
    onClose: () => void;
}

const HintLogic: React.FC<HintLogicProps> = ({ visible, message, onClose }) => {
    const slideMessage = useRef<Animated.Value>(new Animated.Value(0)).current;

    // This is the animation function that the hint will use
    React.useEffect(() => {
        if (visible) {
            Animated.timing(slideMessage, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideMessage, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    // This will have our hint container slide up from the bottom of the screen
    const translateY = slideMessage.interpolate({
        inputRange: [0, 1],
        outputRange: [500, -100],
    });

    return (
        <Animated.View
            style={[styles.hintContainer, { transform: [{ translateY }] }]}
        >
            <View style={styles.hintMessage}>
                <Text style={styles.hintText}>{message}</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default HintLogic;

const styles = StyleSheet.create({
    hintContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(151, 154, 153, 0.1)",
        padding: 20,
        borderRadius: 10,
    },
    hintMessage: {
        alignItems: "center",
    },
    hintText: {
        color: "black",
        marginBottom: 10,
    },
    closeButton: {
        padding: 5,
        backgroundColor: "red",
        borderRadius: 5,
    },
    closeButtonText: {
        color: "white",
    },
});
