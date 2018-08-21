import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 7
  }
})

export default function Button ({ backgroundColor, title, color, onPress, styles, disabled }) {
  return (
    <TouchableOpacity
      style={[styles, style.button, { backgroundColor: backgroundColor }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{color: color, textAlign: 'center'}}>{title}</Text>
    </TouchableOpacity>
  )
}