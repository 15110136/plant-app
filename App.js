import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from "react-redux";
import configStore from './constants/configStore'
 
import { AppLoading, Asset } from 'expo';

import Navigation from './navigation';
import { Block } from './components';

const store = configStore()

// import IterReport from './screens/iterScreens/iterReport';
// import SupportIter from './screens/iterScreens/SupportIterScreen';
// import Contact from './screens/iterScreens/ContactIterScreen';
// import ClientReport from './screens/clientReport';
// import all used images
const images = [
  require('./assets/icons/back.png'),
  require('./assets/icons/plants.png'),
  require('./assets/icons/seeds.png'),
  require('./assets/icons/flowers.png'),
  require('./assets/icons/sprayers.png'),
  require('./assets/icons/pots.png'),
  require('./assets/icons/fertilizers.png'),
  require('./assets/images/plants_1.png'),
  require('./assets/images/plants_2.png'),
  require('./assets/images/plants_3.png'),
  require('./assets/images/explore_1.png'),
  require('./assets/images/explore_2.png'),
  require('./assets/images/explore_3.png'),
  require('./assets/images/explore_4.png'),
  require('./assets/images/explore_5.png'),
  require('./assets/images/explore_6.png'),
  require('./assets/images/illustration_1.png'),
  require('./assets/images/illustration_2.png'),
  require('./assets/images/illustration_3.png'),
  require('./assets/images/avatar.png'),
];

// export default class App extends React.Component{
//   render(){
//     return(
//       <SupportIter />
//     );
//   }
// }
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }

    return (
      <Provider store={store}>
        <Block white>
          <Navigation />
        </Block>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
});
