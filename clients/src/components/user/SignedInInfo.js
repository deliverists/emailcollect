import React from 'react';
import { observer } from 'mobx-react';
import { Text } from "react-native";

export default observer(({ userStore }) => {
  return (
    <Text>
      {userStore.signedIn && 'Signed in'}
      {!userStore.signedIn && 'Signed out'}
    </Text>
  );
});

