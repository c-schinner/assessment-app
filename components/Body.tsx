import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import React from 'react'

interface BodyProps {
    question: string;
    options: string[];
    correctAnswer: string;
    onCorrect: () => void;
}

const Body: React.FC<BodyProps> = ({ question, options, correctAnswer, onCorrect }) => {
    const handleAnswer = (selectedAnswer: string) => {
        if (selectedAnswer === 'correctAnswer') {
            onCorrect();
        } else {
            alert('Try again');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question}</Text>
            {options.map((option, index) => (
                <TouchableOpacity key={index} onPress={() => handleAnswer(option)} style={styles.option}>
                    <Text>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    question: {
        fontSize: 20,
        marginBottom: 10,
    },
    option: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 5,
        borderRadius: 5,
    },
})