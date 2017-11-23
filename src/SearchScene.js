// @flow
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {ROUTES} from './lib/constants';

type UserDetail = {
  login: string,
  url: string,
};
type Props = {
  navigate: (page: string) => void,
};
type State = {
  users: Array<UserDetail>,
  userInput: string,
  isLoading: boolean,
};

type ListItemProps = {repo: UserDetail};

class RepoListItem extends Component<ListItemProps> {
  render() {
    let repo = this.props.repo;
    let onPress = () => {
      Alert.alert(repo.login, repo.url, [{text: 'Close'}]);
    };
    return (
      <TouchableOpacity onPress={onPress}>
        <View>
          <Text>{repo.login}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

async function fetchRepositories(username: string) {
  let response = await fetch(
    `https://api.github.com/search/users?q=${username}`,
  );
  let data = await response.json();
  let items = data.items;
  return items.map(item => {
    return {
      login: item.login,
      url: item.url,
    };
  });
}

export default class SearchScene extends Component<Props, State> {
  state = {
    users: [],
    userInput: '',
    isLoading: false,
  };

  async fetchNow() {
    this.setState({isLoading: true});
    let users = await fetchRepositories(this.state.userInput);
    this.setState({users: users});
    this.setState({isLoading: false});
  }
  render() {
    let {users, isLoading} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Search</Text>
        <TextInput
          placeholder="Enter a username"
          style={styles.textInput}
          value={this.state.userInput}
          onChangeText={text => {
            this.setState({
              userInput: text.replace(/\W/g, ''),
            });
          }}
        />

        {isLoading === false && users.length === 0 ? (
          <Text>Nothing to display</Text>
        ) : null}

        {isLoading === false ? (
          <ScrollView style={{flex: 1}}>
            {users.map((repo, i) => <RepoListItem key={i} repo={repo} />)}
          </ScrollView>
        ) : null}
        {isLoading ? (
          <ActivityIndicator
            color="#bc2b78"
            size="large"
            style={{
              alignItems: 'flex-start',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 80,
            }}
          />
        ) : null}

        <Button
          title="Search"
          style={{flex: 0}}
          onPress={() => this.fetchNow()}
        />
        <Button title="Back" onPress={() => this.props.navigate(ROUTES.HOME)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  textInput: {
    height: 30,
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 3,
    borderRadius: 2,
    flex: 1,
  },
});
