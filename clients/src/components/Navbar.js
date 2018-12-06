import React from 'react';
import { observer } from 'mobx-react';
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from '../Routing';

import AuthInfo from './AuthInfo';
import Signout from './Signout';

export default observer(({ userStore }) => {
  const signedIn = <Signout userStore={userStore} />
  const signedOut = (
    <View>
      <Link to={'/login'} component={TouchableOpacity}>
          <Text>login</Text>
      </Link>
      <Link to={'/signup'} component={TouchableOpacity}>
          <Text>signup</Text>
      </Link>
    </View>
  )
  
  return (
    <View>
      <AuthInfo userStore={userStore} />
      {userStore.authenticated && signedIn}
      {!userStore.authenticated && signedOut}
    </View>
  );
});
