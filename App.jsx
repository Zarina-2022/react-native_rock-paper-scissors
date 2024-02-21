import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';

// data import
import {choices} from './src/data/mockData';

// utils import
import {COLORS} from './src/utils/constants';

const App = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const handlePlayersChoice = playerChosenItem => {
    setUserChoice(playerChosenItem);
    handleComputerChoice(playerChosenItem);
  };

  const handleComputerChoice = playerChosenItem => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChosenItem = choices[randomIndex];
    setComputerChoice(computerChosenItem);
    determineWinner(playerChosenItem, computerChosenItem);
  };

  // player ve computer yukaridaki parametrelerin siralamasina gore kabul edilir:
  const determineWinner = (player, computer) => {
    if (player.name === computer.name) {
      setResult('DRAW !!!');
    } else if (
      (player?.name === 'Stone' && computer?.name === 'Scissors') ||
      (player?.name === 'Paper' && computer?.name === 'Stone') ||
      (player?.name === 'Scissors' && computer?.name === 'Paper') 
    ) {
      setResult('You win !!!')
    } else{
      setResult('You lost !!!')
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <Text style={styles.title}>ROCK PAPER SCISSORS</Text>
        <Text style={styles.choiceText}>The Choice Of The Player:</Text>
        <View style={styles.choices}>
          {/**Here we map() choices fron mockData.js */}
          {choices?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={
                item?.name === userChoice?.name ? [styles.button, styles.activeButton] : styles.button
              }
              onPress={() => handlePlayersChoice(item)}>
              <Image source={item.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}>{result}</Text>

        {computerChoice && (
          <>
            <Text style={styles.choiceText}>The Choice Of The Computer:</Text>
            <View style={styles.button}>
              <Image source={computerChoice?.image} style={styles.image} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
  },
  choiceText: {
    marginVertical: 20,
    fontSize: 20,
    color: COLORS.white,
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  image: {
    width: 90,
    height: 90,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 10,
  },
  activeButton:{
    borderWidth:4,
    borderColor:'red'
  }
});
