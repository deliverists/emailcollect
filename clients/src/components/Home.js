import React from 'react';
import { View, Text } from "react-native";
import { Link } from '../routing/Components';

export default () => {
  return (
    <View>
      <Text>Home page</Text>
      <Link to={'/emails'}>
          <Text>emails</Text>
      </Link>

      <Link to={'/sites'}>
          <Text>sites</Text>
      </Link>
    </View>
  );
};
