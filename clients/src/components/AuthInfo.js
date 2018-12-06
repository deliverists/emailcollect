import React from 'react';
import { observer } from 'mobx-react';
import { Text } from "react-native";

export default observer(({ userStore }) => {
  return (
    <Text>
      {userStore.authenticated && 'Signed in'}
      {!userStore.authenticated && 'Signed out'}
    </Text>
  );
});

