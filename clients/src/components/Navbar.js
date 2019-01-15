import React from 'react';
import { observer } from 'mobx-react';
import { View, Text } from "react-native";
import { Link } from '../routing/Components';

import SignedInInfo from './user/SignedInInfo';
import SignOut from './user/SignOut';

export default observer(({ userStore }) => {
  const signedIn = <SignOut userStore={userStore} />
  const signedOut = (
    <View>
      <Link to={'/signin'}>
          <Text>sign in</Text>
      </Link>
      <Link to={'/signup'}>
          <Text>signup</Text>
      </Link>
    </View>
  )
  
  return (
    <View>
      <SignedInInfo userStore={userStore} />
      {userStore.signedIn && signedIn}
      {!userStore.signedIn && signedOut}
    </View>
  );
});
