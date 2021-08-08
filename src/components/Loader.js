import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default class Loader extends Component {
    render() {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#60A5FA" />
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      position: 'relative'
    }
  })