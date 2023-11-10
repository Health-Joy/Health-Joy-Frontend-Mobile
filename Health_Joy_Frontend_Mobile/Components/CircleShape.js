import React from 'react';
import {View, StyleSheet} from 'react-native';

const CircleShape = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circleContainer_1}>
        <View style={[styles.circle]} />
      </View>
      <View style={styles.circleContainer_2}>
        <View style={[styles.circle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  circleContainer_1: {
    flexDirection: 'row',
    marginTop: -110,
    marginLeft: -30,
  },
  circleContainer_2: {
    flexDirection: 'row',
    marginTop: -50,
    marginLeft: -100,
  },

  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(20, 135, 32, 0.6)',
    marginHorizontal: 5,
  },
});

export default CircleShape;
