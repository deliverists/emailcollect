import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from '../Routing';

export default () => {
  return (
    <View>
      <Text>Home page</Text>
      <Link to={'/emails'} component={TouchableOpacity}>
          <Text>emails</Text>
      </Link>

      <Link to={'/sites'} component={TouchableOpacity}>
          <Text>sites</Text>
      </Link>
    </View>
  );
};
