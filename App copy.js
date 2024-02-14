import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';


import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,

  
} from 'react-native-reanimated';


import Swiper from 'react-native-deck-swiper';



export default function App() {

  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  let cards = new Array(3000)
  for (let i = 0; i < 3000; i++) {
    cards[i] = {
      bgcolor:getRandomColor(),
      text: Math.random()+""

    }
  }


 // console.log(cards)


  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      {/* <Animated.View
        style={[{ width: 100, height: 80, backgroundColor: 'pink', margin: 30 }, style]}
      />
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      /> */}


      <Swiper
        //  cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
        cards={cards}
        renderCard={(card) => {
          return (
            <View style={[styles.card,{backgroundColor:card.bgcolor}]}>
              <Button title='a'/>
              <Text style={styles.text}>{card.text}</Text>
            </View>
          )
        }}
        onSwiped={(cardIndex) => { console.log(cardIndex) }}
        onSwipedAll={() => { console.log('onSwipedAll') }}
        cardIndex={0}
        backgroundColor={'#4FD0E9'}
        stackSize={3}>
        <Button 
          onPress={() => { console.log('oulala') }}
          title="Press me">
          You can press me
        </Button>
      </Swiper>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}