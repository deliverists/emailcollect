import React from 'react';
import { observer } from 'mobx-react';
import { Button } from "react-native";

export default observer(({ userStore }) => {
  const onSignOut = async () => {
    await userStore.signOut();
  };

  return (
    <Button
      title={'Sign out'}
      onPress={onSignOut}
    />
  );
});
