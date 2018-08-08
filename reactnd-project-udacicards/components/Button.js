import React from 'react'
import { Text, TouchableOpacity, Stylesheet } from 'react-native';

const style = Stylesheet.create({
  button: {
    backgroundColor: backgroundColor,
    padding: 10,
    margin: 5,
    borderRadius: 7
  }
})

export default function Button ({ backgroundColor, title, color, onPress, styles }) {
  return (
    <TouchableOpacity style={[styles, style.button]} onPress={onPress}>
      <Text style={{color: color, textAlign: 'center'}}>{title}</Text>
    </TouchableOpacity>
  )
}