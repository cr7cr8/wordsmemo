import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import * as Device from 'expo-device';
import { StyleSheet, Button, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height


import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'; //npx expo install react-native-gesture-handler

import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  withDelay,
  useAnimatedStyle,
  Easing,
  LinearTransition,
  JumpingTransition,
  CurvedTransition,
  ZoomIn,
  runOnJS


} from 'react-native-reanimated';
import { FadeIn, FadeOut, BounceIn, BounceOut, SlideOutUp } from 'react-native-reanimated';
const { View, Text, ScrollView } = Animated

import superagent from "superagent"
import * as cheerio from 'cheerio';
import promiseSeq from "promise-sequential"

// import Swiper from 'react-native-deck-swiper';


// const cards = new Array(3000)
// for (let i = 0; i < 3000; i++) {
//   cards[i] = {
//     bgcolor: getRandomColor(),
//     text: "ss"
//   }
// }

// superagent.get("https://www.qq.com").then(response => {

//   //console.log(response.text)

//   const $ = cheerio.load(response.text)
//   console.log($.html());

// })


const wordsArr = new Array(3000)
for (let i = 0; i < 3000; i++) {
  wordsArr[i] = i + 1
}




export default function App() {


  const [show, setShow] = useState(false)

  const preOffsetX = useSharedValue(0)
  const offsetX = useSharedValue(0)


  const style0 = useAnimatedStyle(() => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "wheat",
      flexDirection: "row",
      // position: "absolute",
      flexGrow: 1
    }
  })






  const [pos, setPos] = useState(0)
  const leftPos = pos === 0
    ? (wordsArr.length - 1)
    : pos - 1
  const rightPos = pos === (wordsArr.length - 1)
    ? 0
    : pos + 1

  const increasePos = () => {
    setPos((pre) => {
      if ((pre + 1) >= wordsArr.length) {
        return 0
      }
      else {
        return pre + 1
      }
    });
    preOffsetX.value = 0; offsetX.value = 0;
  }
  const decreasePos = () => {
    setPos((pre) => {
      if ((pre - 1) < 0) {
        return wordsArr.length - 1
      }
      else {
        return pre - 1
      }


    });
    preOffsetX.value = 0; offsetX.value = 0;
  }

  const touchPoint = useSharedValue({ x: 0, y: 0, time: 0 });
  const pan = Gesture.Pan().manualActivation(true)
    .onTouchesDown((e, touchState) => {



      touchPoint.value = { x: e.changedTouches[0].x, y: e.changedTouches[0].y, time: Date.now() }

      // touchState.begin()
      // touchState.activate()

    })
    .onTouchesMove((e, touchState) => {

      const touchX = e.changedTouches[0].x
      const touchY = e.changedTouches[0].y
      const touchTime = touchPoint.value.time
      const now = Date.now()

      // console.log("abs",Math.abs(touchPoint.value.y - touchY))

      console.log("time", now - touchTime, Math.abs(touchPoint.value.y - touchY))


      if (

        (((now - touchTime) > 50) && (Math.abs(touchPoint.value.x - touchX) < 5))
        // || (((now - touchTime) < 50) && (Math.abs(touchPoint.value.y - touchY) > 10))


      ) {
        touchState.fail()
      }


      else {
        touchState.activate()
      }

      // if(Math.abs(touchPoint.value.y - touchY) > 2){
      //   touchState.fail()
      // }
      // else{
      //   touchState.activate()
      // }


    })
    .onTouchesUp((e, touchState) => {
      //touchState.fail()

      touchState.end()


    })
    .onBegin(() => {

    })
    .onStart((event) => {
      // console.log(event)
      // offsetX.value = preOffsetX.value
    })
    .onChange((event) => {


      offsetX.value = preOffsetX.value + event.translationX;

      //console.log(event.translationX, event.translationY)
    })
    .onEnd((event) => {

      console.log(event.translationX)

      if (event.translationX > 30) {
        offsetX.value = withTiming(screenWidth, { duration: 200 }, function () {

          runOnJS(decreasePos)()



        })
        preOffsetX.value = withTiming(screenWidth, { duration: 200 })
      }
      else if (event.translationX < -30) {
        offsetX.value = withTiming(-screenWidth, { duration: 200 }, function () {

          runOnJS(increasePos)()


        })
        preOffsetX.value = withTiming(-screenWidth, { duration: 200 })
      }
      else {
        offsetX.value = withTiming(0, { duration: 200 }, function () {


        })
        preOffsetX.value = withTiming(0, { duration: 200 })
      }

      //  offsetX.value = preOffsetX.value + event.translationX;
      //  preOffsetX.value = preOffsetX.value + event.translationX;

    })
    .onFinalize(() => {


    });


  const leftStyle = useAnimatedStyle(() => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      //  backgroundColor: "#ffaaaa",
      backgroundColor: "#eee",
      height: 300,
      width: screenWidth,
      transform: [{ translateX: offsetX.value }],
      zIndex: 100,
      elevation: 5,
      borderRightWidth: 1,
      borderRightColor: "#111"

    }
  })

  const midStyle = useAnimatedStyle(() => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      //   backgroundColor: "#aaffaa",
      backgroundColor: "#eee",
      height: 300,
      width: screenWidth,
      zIndex: 50,
      elevation: 1,
      //  borderWidth:1,
    }
  })

  const rightStyle = useAnimatedStyle(() => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      // backgroundColor: "#aaaaff",
      backgroundColor: "#eee",
      height: 300,
      width: screenWidth,
      transform: [{ translateX: offsetX.value }],
      zIndex: 100,
      elevation: 5,
      borderLeftWidth: 1,
      borderLeftColor: "#111"
    }
  })

  const textStyle = useAnimatedStyle(() => {
    return {
      fontSize: 20
    }
  })


  const animatedStyles = useAnimatedStyle(() => {

    return {
      transform: [{ translateX: offsetX.value }],
    }
  });

  useEffect(() => {

    console.log("pos >>>>", pos)

    //scrollRef.current.scrollTo({ y: 0, animated: true, })

  }, [pos])

  const scrollRef = useRef()

  return (
    <View style={[style0]}>


      <View style={[leftStyle]}>

        <ScrollView contentContainerStyle={{ backgroundColor: "pink", width: screenWidth, display: "flex", alignItems: "center" }} scroll onScrollEndDrag={function (e) { }}>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[leftPos]}a</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[leftPos]}b</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[leftPos]}c</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[leftPos]}d</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[leftPos]}e</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[leftPos]}f</Text>
        </ScrollView>



      </View>
      <GestureHandlerRootView>
        <GestureDetector gesture={pan} >
          <View style={[midStyle]}>
            {/* <Text style={[textStyle]}>{wordsArr[pos]}</Text> */}

            <ScrollView

              ref={scrollRef}
              contentContainerStyle={{ backgroundColor: "pink", width: screenWidth, display: "flex", alignItems: "center" }} onScrollEndDrag={function (e) { }}>
              <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[pos]}a</Text>
              <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[pos]}b</Text>
              <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[pos]}c</Text>
              <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[pos]}d</Text>
              <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[pos]}e</Text>
              <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[pos]}f</Text>
            </ScrollView>


          </View>
        </GestureDetector>
      </GestureHandlerRootView>

      <View style={[rightStyle]}>
        <ScrollView contentContainerStyle={{ backgroundColor: "pink", width: screenWidth, display: "flex", alignItems: "center" }} onScrollEndDrag={function (e) { }}>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[rightPos]}a</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[rightPos]}b</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[rightPos]}c</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[rightPos]}d</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[rightPos]}e</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[rightPos]}f</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[rightPos]}a</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[rightPos]}b</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[rightPos]}c</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[rightPos]}d</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[rightPos]}e</Text>
          <Text style={[textStyle, { fontSize: 50, }]}>{wordsArr[rightPos]}f</Text>
        </ScrollView>


      </View>




    </View >
  )
}


// export default function App_() {

//   const randomWidth = useSharedValue(10);

//   const config = {
//     duration: 500,
//     easing: Easing.bezier(0.5, 0.01, 0, 1),
//   };

//   const style = useAnimatedStyle(() => {
//     return {
//       width: withTiming(randomWidth.value, config),
//     };
//   });

//   let cards = new Array(3000)
//   for (let i = 0; i < 3000; i++) {
//     cards[i] = {
//       bgcolor: getRandomColor(),
//       text: i + 1 + ""

//     }
//   }


//   // console.log(cards)


//   return (
//     // <View style={styles.container}>
//     //   <Text>Open up App.js to start working on your app!</Text>
//     //   <StatusBar style="auto" />
//     // </View>
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'column',
//       }}>
//       {/* <Animated.View
//         style={[{ width: 100, height: 80, backgroundColor: 'pink', margin: 30 }, style]}
//       />
//       <Button
//         title="toggle"
//         onPress={() => {
//           randomWidth.value = Math.random() * 350;
//         }}
//       /> */}


//       <Swiper
//         //  cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
//         cards={cards}
//         goBackToPreviousCardOnSwipeRight={true}
//         inputRotationRange={[0, 0, 0]}
//         outputRotationRange={["-0deg", "0deg", "0deg"]}
//         renderCard={(card) => {
//           return (
//             <View style={[styles.card, { backgroundColor: card.bgcolor }]}>
//               <Button title='a' />
//               <Text style={styles.text}>{card.text}</Text>
//             </View>
//           )
//         }}
//         onSwiped={(cardIndex) => { console.log(cardIndex) }}
//         onSwipedAll={() => { console.log('onSwipedAll') }}
//         cardIndex={0}
//         backgroundColor={'#4FD0E9'}
//         stackSize={3}>
//         <Button
//           onPress={() => { console.log('oulala') }}
//           title="Press me">
//           You can press me
//         </Button>
//       </Swiper>

//     </View>
//   );
// }

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