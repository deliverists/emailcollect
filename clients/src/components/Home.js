import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from '../Routing';

export default () => {
  return (
    <View>
      <Text>Home page</Text>
      <Link to={'/login'} component={TouchableOpacity}>
          <Text>link to login</Text>
      </Link>
      <Link to={'/emails'} component={TouchableOpacity}>
          <Text>link to emails</Text>
      </Link>
    </View>
  );
};
