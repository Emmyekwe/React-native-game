import { StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'

const Title = ({ children }) => {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        // borderWidth: Platform.OS === 'andriod' ? 2 : 0,
        // borderWidth: Platform.select({ android: 2, ios: 0 }),
        padding: 12,
        maxWidth: '80%',
        width: 300
    }
})