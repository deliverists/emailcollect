import React from 'react';
import { observer } from 'mobx-react';
import { Alert, View, Text, Button } from "react-native";
import { Link } from '../routing/Components';
import { API } from "aws-amplify";

export default observer(({ userStore }) => {
  const sites = async () => {
    const response = await API.get("emailcollect", "/sites");
    console.log(response.status);
    Alert.alert(response.status);
  };

  const emails = async () => {
    const response = await API.get("emailcollect", "/emails");
    console.log(response.status);
    Alert.alert(response.status);
  };

  return (
    <View>
      <Text>Emails page</Text>

      <Button
        title={'sites'}
        onPress={sites}
      />

    {userStore.signedIn && 
      <Button
        title={'emails'}
        onPress={emails}
      />
    }

      <Link to={'/'}>
          <Text>home</Text>
      </Link>
    </View>
  );
});
