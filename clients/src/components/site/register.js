import React from 'react';
import { observer } from 'mobx-react';
import { View, Text, TextInput, Button } from "react-native";
import { Link } from '../../routing/Components';

export default observer(({ sitesStore, history }) => {
  const updateSiteToRegister = async site => {
    await sitesStore.updateSiteToRegister(site)
  }

  const registerSite = async site => {
    const response = await sitesStore.registerSite(site)
    if (response.success)
      history.push('/sites')
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
