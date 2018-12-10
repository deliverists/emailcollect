import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Link } from '../../Routing';
import { observer } from 'mobx-react';

import SignedIn from './SignedIn';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
    };
  }

  async onSignIn() {
    const { email, password } = this.state;
    const { success } = await this.props.userStore.signIn(email, password);
    if (success) this.props.history.push("/");
  }

  render() {
    const { error, state, signedIn } = this.props.userStore;

    const signinForm = <View>
      <TextInput
        value={this.state.email}
        onChangeText={(email) => this.setState({ email })}
        placeholder={'email'}
      />
      <TextInput
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      <Text>State: {state}</Text>
      <Text>Error: {error}</Text>

      <Button
        title={'Sign in'}
        onPress={this.onSignIn.bind(this)}
      />
    </View>
    return (
      <View>
        <Text>Sign in</Text>

        {signedIn && <SignedIn />}
        {!signedIn && signinForm}

        <Link to={'/'} component={TouchableOpacity}>
            <Text>home</Text>
        </Link>
      </View>
    );
  }
};

export default observer(SignIn);
