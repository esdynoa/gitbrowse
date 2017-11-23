// @flow
import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, BackHandler} from 'react-native';
import HomeScene from './HomeScene';
import SearchScene from './SearchScene';
import BrowseScene from './BrowseScene';

import {ROUTES} from './lib/constants';

type Props = {};
type State = {
  currentPage: string,
};

export default class App extends Component<Props, State> {
  state = {
    currentPage: ROUTES.HOME,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
  }

  _onBackPress = () => {
    if (this.state.currentPage === ROUTES.HOME) {
      return false;
    } else {
      this.setState({currentPage: ROUTES.HOME});
      return true;
    }
  };

  render() {
    let navigate = page => this.setState({currentPage: page});
    switch (this.state.currentPage) {
      case ROUTES.HOME: {
        return <HomeScene navigate={navigate} />;
      }
      case ROUTES.SEARCH: {
        return <SearchScene navigate={navigate} />;
      }
      case ROUTES.BROWSE: {
        return <BrowseScene navigate={navigate} />;
      }
      default: {
        throw new Error('Unknown route.');
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
});
