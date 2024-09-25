import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import Hint from './Hint';

interface BodyProps {
    question: string;
    answers: string[];
    correctAnswer: string;
    onCorrect: () => void;
}

const message = 'Hint: ';

const Body: React.FC<BodyProps> = ({ question, answers, correctAnswer, onCorrect }) => {
    const [hintVisible, setHintVisible] = useState<boolean>(false);

    const handleAnswer = (selectedAnswer: string) => {
        if (selectedAnswer === correctAnswer) {
            onCorrect();
        } else {
            setHintVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question}:</Text>
            {answers.map((answer, index) => (
                <TouchableOpacity key={index} onPress={() => handleAnswer(answer)} style={styles.option}>
                    <Text>{answer}</Text>
                </TouchableOpacity>
            ))}
            <Hint 
                visible={hintVisible}
                message={message}
                onClose={() => setHintVisible(false)} />
        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
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