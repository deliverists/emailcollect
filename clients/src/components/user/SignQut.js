import React from 'react';
import { observer } from 'mobx-react';
import { Auth } from "aws-amplify";
import { Button } from "react-native";

export default observer(({ userStore }) => {
  const onSignOut = async () => {
    await Auth.signOut();
    userStore.hasSignedOut();
  };

  return (
    <Button
      title={'Sign out'}
      onPress={onSignOut}
    />
  );
});
