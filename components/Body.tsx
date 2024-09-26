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
    "Hint: Think about how you would display output in JavaScript. Which function is commonly used for logging messages to the console?.",
    "Hint: Remember that in JavaScript, functions are called by their names followed by parentheses. Pay attention to the correct function name and its syntax.",
    "Hint: The correct way to log a message starts with 'console.' Make sure you include the proper method and format the message correctly within the parentheses.",
]

const Body: React.FC<BodyProps> = ({ question, answers, correctAnswer, onCorrect }) => {
    const [hintVisible, setHintVisible] = useState<boolean>(false);
    const [attempts, setAttempts] = useState<number>(-1);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isCorrectAnswerSubmitted, setIsCorrectAnswerSubmitted] = useState<boolean>(false);
    const [showRetryButton, setShowRetryButton] = useState<boolean>(false);

    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const handleSubmit = () => {
        if (selectedAnswer === correctAnswer) {
            onCorrect();
            setIsCorrectAnswerSubmitted(true);
            setAttempts(-1);
        } else {
            setAttempts((prev) => Math.min(prev + 1, message.length - 1));
            setHintVisible(true);
            shake();
            setIsSubmitted(true);
            setShowRetryButton(true);
        }
        setIsSubmitted(true);
    }

    const handleRetry = () => {
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setShowRetryButton(false);
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
            {!isCorrectAnswerSubmitted && answers.map((answer, index) => (
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
            {!isCorrectAnswerSubmitted && !showRetryButton && (
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                    <Text style={styles.answerTextSelected}>Submit</Text>
            </TouchableOpacity>
            )}

            {showRetryButton && (
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={handleRetry}>
                        <Text style={styles.answerTextSelected}>Retry</Text>
                </TouchableOpacity>
            )}

            {isCorrectAnswerSubmitted && (
                <View style={styles.correctAnswerContainer}>
                    <Text style={styles.answerTextSelected}>{correctAnswer}</Text>
                </View>
            )}
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
    },
    correctAnswerContainer: {
        backgroundColor: 'green',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10,
        width: '50%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    retryButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10,
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
    },
});