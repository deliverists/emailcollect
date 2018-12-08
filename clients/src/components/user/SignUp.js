import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Link } from '../../Routing';
import { Auth } from "aws-amplify";
import { observer } from 'mobx-react';

import SignedIn from './SignedIn';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: "",
      password: "",
      confirmationCode: "",
      newUser: null
    };
  }

  handleSubmit = async () => {
    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.username,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      alert(typeof e === 'string' ? e : e.message);
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async () => {
    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.username, this.state.confirmationCode);
      await Auth.signIn(this.state.username, this.state.password);

      this.props.userStore.hasSignedIn();
      this.props.history.push("/");
    } catch (e) {
      alert(typeof e === 'string' ? e : e.message);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const signup = <View>
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
        title={'Sign up'}
        onPress={this.handleSubmit.bind(this)}
      />
    </View>;

    const confirmation = <View>
      <TextInput
        value={this.state.confirmationCode}
        onChangeText={(confirmationCode) => this.setState({ confirmationCode })}
        placeholder={'Confirmation code'}
      />

      <Button
        title={'Verify'}
        onPress={this.handleConfirmationSubmit.bind(this)}
      />
    </View>;

    return (
      <View>
        <Text>Sign up:</Text>

        {!this.props.userStore.signedIn && this.state.newUser && confirmation}
        {!this.props.userStore.signedIn && !this.state.newUser && signup}
        {this.props.userStore.signedIn && <SignedIn />}

        <Link to={'/'} component={TouchableOpacity}>
            <Text>home</Text>
        </Link>
      </View>
    );
  }
};

export default observer(SignUp);
