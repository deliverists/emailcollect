import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Link } from '../../Routing';
import { Auth } from "aws-amplify";
import { observer } from 'mobx-react';

import SignedIn from './SignedIn';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }

  async onSignIn() {
    const { username, password } = this.state;
    await Auth.signIn(username, password);
    this.props.userStore.hasSignedIn();
    this.props.history.push("/");
  }

  render() {
    const signinForm = <View>
      <TextInput
        value={this.state.username}
        onChangeText={(username) => this.setState({ username })}
        placeholder={'Username'}
      />
      <TextInput
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        placeholder={'Password'}
        secureTextEntry={true}
      />

      <Button
        title={'Sign in'}
        onPress={this.onSignIn.bind(this)}
      />
    </View>
    return (
      <View>
        <Text>Sign in</Text>

        {this.props.userStore.signedIn && <SignedIn />}
        {!this.props.userStore.signedIn && signinForm}

        <Link to={'/'} component={TouchableOpacity}>
            <Text>go home</Text>
        </Link>
      </View>
    );
  }
};

export default observer(SignIn);
