import { TouchableOpacity, Button, StyleSheet, View, Text, Animated } from 'react-native'
import React, { useState, useRef } from 'react'
import Hint from './Hint';

interface BodyProps {
    question: string;
    answers: string[];
    correctAnswer: string;
    onCorrect: () => void;
}

const message = [
    'Hint: This is the first hint.',
    'Hint: This is the second hint.',
    'Hint: This is the third hint.',
]

const Body: React.FC<BodyProps> = ({ question, answers, correctAnswer, onCorrect }) => {
    const [hintVisible, setHintVisible] = useState<boolean>(false);
    const [attempts, setAttempts] = useState<number>(-1);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const handleSubmit = () => {
        if (selectedAnswer === correctAnswer) {
            onCorrect();
            setAttempts(-1);
        } else {
            setAttempts((prev) => Math.min(prev + 1, message.length - 1));
            setHintVisible(true);
            shake();
        }
        setIsSubmitted(true);
    }

    const shake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleSelectAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        setIsSubmitted(false);
    };

    const getAnswerStyle = (answer: string) => {
        if (isSubmitted && answer === selectedAnswer) {
            return answer === correctAnswer ? styles.correctAnswer : styles.wrongAnswer;
        }
        return answer === selectedAnswer ? styles.selectedAnswer : styles.option;
    }

    const getTextStyle = (answer: string) => {
        return answer === selectedAnswer ? styles.answerTextSelected : styles.answerText;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question}:</Text>
            {answers.map((answer, index) => (
                <Animated.View
                    key={index}
                    style={[
                        getAnswerStyle(answer),
                        selectedAnswer === answer && answer !== correctAnswer && isSubmitted 
                        ? { transform: [{ translateX: shakeAnimation}] }
                        : {},
                    ]}>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleSelectAnswer(answer)}>
                        <Text style={getTextStyle(answer)}>{answer}</Text>
                    </TouchableOpacity>
                </Animated.View>
            ))}
            <Button 
                title="Submit"
                onPress={handleSubmit}
                />
            <Hint 
                visible={hintVisible}
                message={message[attempts]}
                onClose={() => setHintVisible(false)} />
        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        padding: 20,
    },
    question: {
        fontSize: 20,
        marginBottom: 20,
    },
    option: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 5,
        borderRadius: 5,
    },
    optionButton: {
        width: '100%',
        alignItems: 'center',

    },
    selectedAnswer: {
        backgroundColor: 'blue',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        borderRadius: 5,
    },
    correctAnswer: {
        backgroundColor: 'green',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        borderRadius: 5,
    },
    wrongAnswer: {
        backgroundColor: 'red',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        borderRadius: 5,
    },
    answerText: {
        color: 'black',
    },
    answerTextSelected: {
        color: 'white',
    }
});