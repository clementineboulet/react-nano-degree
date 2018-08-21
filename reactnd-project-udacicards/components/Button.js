import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 7
  }
})

/**
* @description Deck Component
* @constructor
* @param {string} title - the text of the button
* @param {string} backgroundColor - the background color of the button
* @param {string} color - the foreground color of the button
* @param {object} styles - the additional styles
* @param {boolean} disabled - disable the button
* @param {func} onPress - on press button event action
*/

export default function Button ({
  backgroundColor,
  title,
  color,
  onPress,
  styles,
  disabled
}) {
  return (
    <TouchableOpacity
      style={[styles, style.button, { backgroundColor: disabled? 'grey': backgroundColor }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{color: color, textAlign: 'center'}}>{title}</Text>
    </TouchableOpacity>
  )
}