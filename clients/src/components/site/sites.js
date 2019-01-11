import React from 'react';
import { observer } from 'mobx-react';
import { View, Text, FlatList } from "react-native";
import { Link } from '../../Routing';
import Site from './site';

export default observer(({ sitesStore }) => (
    <View>
      <Text>Registered sites</Text>

      <Link to={'/sites/register'}>
          <Text>register a site</Text>
      </Link>

      <Text>{sitesStore.loading && 'loading...'}</Text>
      <Text>error: {sitesStore.error}</Text>

      <Text>sites: {sitesStore.sites.length}</Text>

      <FlatList
        data={sitesStore.sites}
        renderItem={({site}) => <Site site={site}></Site>}
      />

      <Link to={'/'}>
          <Text>home</Text>
      </Link>
    </View>
));
