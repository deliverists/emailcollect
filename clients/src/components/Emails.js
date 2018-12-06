import React from 'react';
import { observer } from 'mobx-react';
import { Alert, View, Text, Button, TouchableOpacity } from "react-native";
import { Link } from '../Routing';
import { API } from "aws-amplify";

export default observer(({ userStore }) => {
  const health = async () => {
    const response = await API.get("emails", "/health");
    console.log(response.status);
    Alert.alert(response.status);
  };

  const emails = async () => {
    const response = await API.get("emails", "/emails");
    console.log(response.status);
    Alert.alert(response.status);
  };

  console.log('NICK', userStore)

  return (
    <View>
      <Text>Emails page</Text>

      <Button
        title={'health'}
        onPress={health}
      />

    {userStore.authenticated && 
      <Button
        title={'emails'}
        onPress={emails}
      />
    }

      <Link to={'/'} component={TouchableOpacity}>
          <Text>link to home</Text>
      </Link>
    </View>
  );
});
