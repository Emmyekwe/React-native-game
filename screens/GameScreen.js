import { StyleSheet, Text, View, Alert, FlatList, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'

import Title from '../components/ui/Title'
import PrimaryButton from '../components/ui/PrimaryButton';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions()


    useEffect(() => {
      if (currentGuess === userNumber) {
        onGameOver(guessRounds.length);
      }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
      minBoundary = 1;
      maxBoundary = 100;
    }, [])

    function nextGuessHandler(direction) {
      if (
        (direction === 'lower' && currentGuess < userNumber) || 
        (direction === 'greater' && currentGuess > userNumber) 
        ) {
        Alert.alert("Don't lie!", "You know that this is wrong", [
          { text: 'Sorry!', style: 'cancel'}
        ])
        return;
      }

      if(direction === 'lower') {
        maxBoundary = currentGuess;
      } else {
        minBoundary = currentGuess + 1;
      }
      const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
      setCurrentGuess(newRndNumber)
      setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
    }

    const guessRoundsListLength = guessRounds.length;

    let content = (
                <>
                <NumberContainer> {currentGuess} </NumberContainer>
                <Card>
                  <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
                  <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                      <PrimaryButton onPress={() => nextGuessHandler.bind('lower')}>
                        <Ionicons  name='md-remove' size={24} color="white" />
                      </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                      <PrimaryButton onPress={() => nextGuessHandler('greater')}>
                      <Ionicons  name='md-add' size={24} color="white" />
                      </PrimaryButton>
                    </View>
                  </View>
                </Card>
                </>
              )

              if(width > 500) {
                content = (
                  <>
                    <View style={styles.buttonsContainerWide}>
                      <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler.bind('lower')}>
                          <Ionicons  name='md-remove' size={24} color="white" />
                        </PrimaryButton>
                      </View>
                      <NumberContainer> {currentGuess} </NumberContainer>
                      <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler('greater')}>
                        <Ionicons  name='md-add' size={24} color="white" />
                        </PrimaryButton>
                      </View>
                    </View>
                  

                  </>
                )
              }

  return (
    <View style={styles.screen}>
        <Title>Oponent's Guess</Title>
        {content}
      <View class={styles.listContainer}>
        {/* {guessRounds.map(guessRound => <Text key={guessRound}> {guessRound} </Text> )} */}

        <FlatList 
        data={guessRounds} 
        keyExtractor={(item) => item}
        renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} /> } 
        />

      </View> 
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    instructionText: {
      marginBottom: 12
    },
    buttonsContainer: {
      flexDirection: 'row'
    },
    buttonContainer: {
      flex: 1,
    },
    buttonsContainerWide: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    listContainer: {
      flex:1,
      padding: 16
    }
})