import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import { StyleSheet, Button, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('screen').width


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
  ZoomIn


} from 'react-native-reanimated';
import { FadeIn, FadeOut, BounceIn, BounceOut, SlideOutUp } from 'react-native-reanimated';
const { View, Text } = Animated

// import Swiper from 'react-native-deck-swiper';


// const cards = new Array(3000)
// for (let i = 0; i < 3000; i++) {
//   cards[i] = {
//     bgcolor: getRandomColor(),
//     text: "ss"
//   }
// }


export default function App() {


  const [show, setShow] = useState(false)

  const preOffsetX = useSharedValue(0)
  const offsetX = useSharedValue(0)
  const translationY = useSharedValue(0)

  const style0 = useAnimatedStyle(() => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "wheat",

      // position: "absolute",
      flexGrow: 1
    }
  })

  const style = useAnimatedStyle(() => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "pink",
      height: 100,
      width: 300,
      // position: "absolute",
      // flexGrow: 1
    }
  })
  const animatedStyles = useAnimatedStyle(() => {


    return {
      transform: [{ translateX: offsetX.value }],
    }


  });



  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);
  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onStart((event) => {
      // translationX.value = event.translationX;
      offsetX.value = preOffsetX.value
    })
    .onChange((event) => {
      offset.value = event.translationX;

      offsetX.value = preOffsetX.value + event.translationX;

      //console.log(event.translationX, event.translationY)
    })
    .onEnd((event) => {

      offsetX.value = preOffsetX.value + event.translationX;
      preOffsetX.value = preOffsetX.value + event.translationX;

    })

    .onFinalize(() => {
      offset.value = withSpring(0);
      pressed.value = false;
    });


  const entering = (values) => {
    'worklet';
    //console.log(values)
    const initialValues = {

      originX: -screenWidth,
      transform: [
        //  { rotate: '90deg' },
        //  { scale: 1 },
      ],
    };
    const animations = {

      originX: withSpring(values.targetOriginX),
      transform: [
        // { rotate: withTiming('0deg', { duration: 4000 }) },
        // { scale: withTiming(1, { duration: 3500 }) },
      ],
    };
    const callback = (finished) => { };

    return {
      initialValues, animations, callback
    };
  };

  const exiting = (values) => {
    'worklet';


    //console.log(values)
    const initialValues = {

      originX: values.currentOriginX + offsetX.value,



      //  originX: values.targetOriginX,
      transform: [
        { rotate: '0deg' },
        { scale: 1 },
      ],
    };
    const animations = {

      originX: withTiming(screenWidth, { duration: 300 }),
      transform: [
        { rotate: withTiming('90deg', { duration: 300 }) },
        { scale: withTiming(0, { duration: 300 }) },
      ],
    };
    const callback = (finished) => { };

    return {
      initialValues, animations, callback
    };


  }

  const layout = (values) => {
    'worklet';

    const initialValues = {
      originY: values.currentOriginY
    };
    const animations = {
      originY: withDelay(100,withSpring(values.targetOriginY))
      // your animations
    };

    const callback = (finished) => {

    };
    return {
      initialValues,
      animations,
      callback,
    };



  }



  return (
    <View style={[style0]}>


      {show && <View style={[style, animatedStyles]}
        // entering={ZoomIn.withInitialValues({ transform: [{ translateX: 300,scale:1 }] })}
        entering={entering}
        //entering={FadeIn}

        exiting={exiting}
      //exiting={SlideOutUp}

      >
        <Text>AAAAAAAAAAAAAV</Text>
      </View>}


      <View
        //layout={JumpingTransition.duration(1000)}
        layout={layout}
      >
        <GestureHandlerRootView>
          <GestureDetector gesture={pan}>
            <View style={[style]}


              entering={BounceIn}><Button title='AADA' onPress={function () { setShow(pre => !pre) }} /><Text>aaddsaa</Text>

            </View>
          </GestureDetector>
        </GestureHandlerRootView>
      </View>




    </View>
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