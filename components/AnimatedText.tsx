import { useEffect, useRef, useState } from "react"
import {Animated, Easing, Text, TextStyle} from "react-native"
import { TextProps } from "react-native-paper"


const AnimatedText = ({text, style, ...rest} : {text: string, style: TextStyle} & TextProps) => {
   const [innerText, setText] = useState("")

   const animation = useRef(new Animated.Value(1))

   useEffect(() => {
        //first moment - transition to zero
        Animated.timing(animation.current, {
            toValue: 0,
            useNativeDriver: true,
            duration: 300,
            easing: Easing.linear
        }).start();
        setTimeout(() => {
            setText(text)
            Animated.timing(animation.current, {
                toValue: 1,
                useNativeDriver: true,
                duration: 300,
                easing: Easing.linear
            }).start();

        }, 301)
      
   }, [text])
   
   
    return <Animated.Text {...rest} style={[style, {opacity: animation.current}]}>{innerText}</Animated.Text>
}


export default AnimatedText