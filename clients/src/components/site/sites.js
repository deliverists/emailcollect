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

      <Text>{sitesStore.loading && 'loading...'}</Text>
      <Text>error: {sitesStore.error}</Text>
      <Text>sites: {sitesStore.sites}</Text>

      <Link to={'/'}>
          <Text>home</Text>
      </Link>
    </View>
));
