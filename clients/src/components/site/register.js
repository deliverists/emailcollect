import React from 'react';
import { observer } from 'mobx-react';
import { View, Text, TextInput, Button } from "react-native";
import { Link } from '../../Routing';

export default observer(({ sitesStore }) => {
  const updateSiteToRegister = async site => {
    await sitesStore.updateSiteToRegister(site)
  }

  const registerSite = async site => {
    await sitesStore.registerSite(site)
  }

  const form = <View>
    <TextInput
      value={sitesStore.siteToRegister}
      onChangeText={updateSiteToRegister}
      placeholder={'Domain name'}
    />

    <Button
      title={'Register domain'}
      onPress={registerSite}
    />
  </View>

  return (
    <View>
      <Text>Register a new site:</Text>

      {form}

      <Link to={'/'}>
          <Text>home</Text>
      </Link>
    </View>
  )
})
