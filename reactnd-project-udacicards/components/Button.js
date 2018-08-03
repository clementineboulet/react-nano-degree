import React from 'react'
import { Text, TouchableOpacity } from 'react-native';

export default function Button ({ backgroundColor, title, color, onPress, styles }) {
  return (
    <TouchableOpacity style={[styles, {backgroundColor: backgroundColor, padding: 10, margin: 5, borderRadius: 7}]} onPress={onPress}>
      <Text style={{color: color, textAlign: 'center'}}>{title}</Text>
    </TouchableOpacity>
  )
}