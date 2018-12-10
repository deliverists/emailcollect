import React from 'react';
import { observer } from 'mobx-react';
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from '../../Routing';

export default observer(({ sitesStore }) => (
    <View>
      <Text>Registered sites</Text>

      <Link to={'/sites/register'} component={TouchableOpacity}>
          <Text>register a site</Text>
      </Link>

      <Link to={'/'} component={TouchableOpacity}>
          <Text>home</Text>
      </Link>
    </View>
));
