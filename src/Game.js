import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Board from './Board';

const Game = () => {
  const initialBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState('');

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handlePress = (rowIndex, cellIndex) => {
    if (board[rowIndex][cellIndex] === '' && !winner) {
      const newBoard = [...board];
      newBoard[rowIndex][cellIndex] = player;
      setBoard(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== '' &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        setWinner(board[i][0]);
        Alert.alert(`${board[i][0]} wins!`);
        return;
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] !== '' &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        setWinner(board[0][i]);
        Alert.alert(`${board[0][i]} wins!`);
        return;
      }
    }
    // Check diagonals
    if (
      board[0][0] !== '' &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      setWinner(board[0][0]);
      Alert.alert(`${board[0][0]} wins!`);
      return;
    }
    if (
      board[0][2] !== '' &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      setWinner(board[0][2]);
      Alert.alert(`${board[0][2]} wins!`);
      return;
    }
    // Check for draw
    if (board.flat().every(cell => cell !== '')) {
      Alert.alert("It's a draw!")
      resetBoard();
      return;
    }
  };

  const resetBoard = () => {
    setBoard(initialBoard);
    setPlayer('X');
    setWinner('');
  };

  return (
    <View style={styles.container}>
      <Text>Current Player: {player}</Text>
      <Board board={board} onPress={handlePress} />
      {winner ? (
        <TouchableOpacity onPress={resetBoard} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Play Again</Text>
        </TouchableOpacity>
      ) : null}

        <TouchableOpacity onPress={resetBoard} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3498db',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
