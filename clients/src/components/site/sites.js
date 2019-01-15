import React from 'react'
import { observer } from 'mobx-react'
import { View, Text, FlatList } from "react-native"
import { Link } from '../../routing/Components'
import Site from './site'

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
      renderItem={site => <Site site={site.item}></Site>}
      keyExtractor={site => site}
    />

    <Link to={'/'}>
        <Text>home</Text>
    </Link>
  </View>
))
