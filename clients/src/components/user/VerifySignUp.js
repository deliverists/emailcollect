import React from 'react';
import { View, Text, TextInput, Button } from "react-native";
import { Link } from '../../Routing';
import { observer } from 'mobx-react';

import SignedIn from './SignedIn';

class VerifySignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmationCode: "",
    };
  }

  handleConfirmationSubmit = async () => {
    const { success } = await this.props.userStore.confirmSignUp(this.state.confirmationCode)
    if (success) this.props.history.push("/");
  };

  render() {
    const { error, state, signedIn } = this.props.userStore;

    const confirmationForm = <View>
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
        <Text>Verify email:</Text>

        {signedIn && <SignedIn />}
        {!signedIn && confirmationForm}

        <Text>State: {state}</Text>
        <Text>Error: {error}</Text>

        <Link to={'/'}>
            <Text>home</Text>
        </Link>
      </View>
    );
  }
};

export default observer(VerifySignUp);
