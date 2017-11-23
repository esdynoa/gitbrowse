// @flow
import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import {ROUTES} from './lib/constants';

type Props = {
  navigate: (page: string) => void,
};

export default class BrowseScene extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Browse</Text>
        <Button title="Back" onPress={() => this.props.navigate(ROUTES.HOME)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});
