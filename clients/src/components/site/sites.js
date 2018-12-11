import React from 'react';
import { observer } from 'mobx-react';
import { View, Text } from "react-native";
import { Link } from '../../Routing';

export default observer(({ sitesStore }) => (
    <View>
      <Text>Registered sites</Text>

      <Link to={'/sites/register'}>
          <Text>register a site</Text>
      </Link>

      <Link to={'/'}>
          <Text>home</Text>
      </Link>
    </View>
));
