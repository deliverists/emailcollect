import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from '../Routing';

export default () => {
  return (
    <View>
      <Text>Login</Text>
      <Link to={'/'} component={TouchableOpacity}>
          <Text>link home</Text>
      </Link>
    </View>
  );
};
