import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Defs, Mask, Circle } from 'react-native-svg';

const RectangleWithCutout = () => {
  return (
    <View style={styles.container}>
      <Svg height="100" width="200" style={styles.svg}>
        <Defs>
          <Mask id="mask" x="0" y="0" width="200" height="100">
            <Rect x="0" y="0" width="200" height="100" fill="white" />
            <Circle cx="200" cy="50" r="50" fill="black" />
          </Mask>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="200"
          height="100"
          fill="blue"
          mask="url(#mask)"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink', // Background color to show through the cutout
  },
  svg: {
    backgroundColor: 'transparent',
  },
});

export default RectangleWithCutout;