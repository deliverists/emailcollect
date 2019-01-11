import React from 'react';
import { View, Text } from "react-native";

export default ({ site }) => {
  console.log('NICK', site)
  return (
    <View>
      {site}
    </View>
  )
}
