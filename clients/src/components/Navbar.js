import React from 'react';
import { observer } from 'mobx-react';
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from '../Routing';

import SignedInInfo from './user/SignedInInfo';
import SignOut from './user/Signout';

export default observer(({ userStore }) => {
  const signedIn = <SignOut userStore={userStore} />
  const signedOut = (
    <View>
      <Link to={'/signin'} component={TouchableOpacity}>
          <Text>sign in</Text>
      </Link>
      <Link to={'/signup'} component={TouchableOpacity}>
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
