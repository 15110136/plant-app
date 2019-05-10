import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Icon,
} from 'react-native';

class JobHistoryList extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <ScrollView style={{ paddingTop: 30 }}>
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.textHeader}>Job History</Text>
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('JobHistoryDetail')}>
            <View style={styles.jobInfo}>
              <View style={styles.Imgcontainer}>
                <Image
                  style={styles.imgStyle}
                  source={require('../assets/icons/1.png')}
                />
              </View>
              <View style={styles.textJobInfo}>
                <Text>Phần mềm</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Price</Text>
                <Text style={styles.textPrice}>1500$</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date start</Text>
                <Text style={styles.textStatus}>5-5-2019</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date end</Text>
                <Text style={styles.textStatus}>5-8-2019</Text>
              </View>
            </View>
          </TouchableOpacity>    
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('JobHistoryDetail')}>
            <View style={styles.jobInfo}>
              <View style={styles.Imgcontainer}>
                <Image
                  style={styles.imgStyle}
                  source={require('../assets/icons/1.png')}
                />
              </View>
              <View style={styles.textJobInfo}>
                <Text>Phần mềm</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Price</Text>
                <Text style={styles.textPrice}>1500$</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date start</Text>
                <Text style={styles.textStatus}>5-5-2019</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date end</Text>
                <Text style={styles.textStatus}>5-8-2019</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('JobHistoryDetail')}>
            <View style={styles.jobInfo}>
              <View style={styles.Imgcontainer}>
                <Image
                  style={styles.imgStyle}
                  source={require('../assets/icons/1.png')}
                />
              </View>
              <View style={styles.textJobInfo}>
                <Text>Phần mềm</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Price</Text>
                <Text style={styles.textPrice}>1500$</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date start</Text>
                <Text style={styles.textStatus}>5-5-2019</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date end</Text>
                <Text style={styles.textStatus}>5-8-2019</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('JobHistoryDetail')}>
            <View style={styles.jobInfo}>
              <View style={styles.Imgcontainer}>
                <Image
                  style={styles.imgStyle}
                  source={require('../assets/icons/1.png')}
                />
              </View>
              <View style={styles.textJobInfo}>
                <Text>Phần mềm</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Price</Text>
                <Text style={styles.textPrice}>1500$</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date start</Text>
                <Text style={styles.textStatus}>5-5-2019</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date end</Text>
                <Text style={styles.textStatus}>5-8-2019</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('JobHistoryDetail')}>
            <View style={styles.jobInfo}>
              <View style={styles.Imgcontainer}>
                <Image
                  style={styles.imgStyle}
                  source={require('../assets/icons/1.png')}
                />
              </View>
              <View style={styles.textJobInfo}>
                <Text>Phần mềm</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Price</Text>
                <Text style={styles.textPrice}>1500$</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date start</Text>
                <Text style={styles.textStatus}>5-5-2019</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date end</Text>
                <Text style={styles.textStatus}>5-8-2019</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('JobHistoryDetail')}>
            <View style={styles.jobInfo}>
              <View style={styles.Imgcontainer}>
                <Image
                  style={styles.imgStyle}
                  source={require('../assets/icons/1.png')}
                />
              </View>
              <View style={styles.textJobInfo}>
                <Text>Phần mềm</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Price</Text>
                <Text style={styles.textPrice}>1500$</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date start</Text>
                <Text style={styles.textStatus}>5-5-2019</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date end</Text>
                <Text style={styles.textStatus}>5-8-2019</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('JobHistoryDetail')}>
            <View style={styles.jobInfo}>
              <View style={styles.Imgcontainer}>
                <Image
                  style={styles.imgStyle}
                  source={require('../assets/icons/1.png')}
                />
              </View>
              <View style={styles.textJobInfo}>
                <Text>Phần mềm</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Price</Text>
                <Text style={styles.textPrice}>1500$</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date start</Text>
                <Text style={styles.textStatus}>5-5-2019</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textHeaderContent}>Date end</Text>
                <Text style={styles.textStatus}>5-8-2019</Text>
              </View>
            </View>
          </TouchableOpacity>      
        </View>
      </ScrollView>
    );
  }
}

export default JobHistoryList;

const styles = StyleSheet.create({
  textHeader: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
  },
  container: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderColor: '#E1E5E5',
    borderLeftWidth: 1,
    borderBottomWidth:2,
    borderRightWidth:2,
    borderTopWidth:0.5,
  },
  contentContainer: {
    height: 56,
    alignItems: 'center',
    flexDirection:'row',
  },
  jobInfo: {
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textJobInfo: {
    flex: 1,
    marginLeft: 16,
  },
  textHeaderContent: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '500',
  },
  textPrice: {
    fontWeight: '600',
    fontSize: 22,
  },
  textStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  Imgcontainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle:{
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellContainer: {
    flex: 1,
  },
});


// import React from 'react';
// import { InteractionManager, StyleSheet, Text, View } from 'react-native';
// import { SharedElementRenderer } from 'react-native-motion';

// import List from './List';
// import Detail from './Detail';
// import ToolbarBackground from './ToolbarBackground';

// class JobHistoryList extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       selectedItem: null,
//       // phase of animation
//       // phase-0:
//       // default
//       //
//       // phase-1:
//       // hide list toolbar, hide list bottom bar, show toolbar background and move item
//       //
//       // phase-2:
//       // show detail toolbar, show detail bottom bar, show details of item
//       //
//       // phase-3
//       // hide details of item
//       //
//       // phase-4
//       // hide detail toolbar, hide detail bootom bar, move item back to scrool view
//       phase: 'phase-0',
//     };
//   }
//   onItemPressed = item => {
//     this.setState({
//       phase: 'phase-1',
//       selectedItem: item,
//     });
//   };
//   onBackPressed = () => {
//     this.setState({
//       phase: 'phase-3',
//     });
//   };
//   onSharedElementMovedToDestination = () => {
//     InteractionManager.runAfterInteractions(() => {
//       this.setState({
//         phase: 'phase-2',
//       });
//     });
//   };
//   onSharedElementMovedToSource = () => {
//     InteractionManager.runAfterInteractions(() => {
//       this.setState({
//         selectedItem: null,
//         phase: 'phase-0',
//       });
//     });
//   };
//   renderPage() {
//     const { selectedItem, position, detailItem, phase } = this.state;

//     return (
//       <View style={{ flex: 1 }}>
//         <List
//           selectedItem={selectedItem}
//           onItemPress={this.onItemPressed}
//           phase={phase}
//         />
//         <Detail
//           phase={phase}
//           selectedItem={selectedItem}
//           onBackPress={this.onBackPressed}
//           onSharedElementMovedToDestination={
//             this.onSharedElementMovedToDestination
//           }
//           onSharedElementMovedToSource={this.onSharedElementMovedToSource}
//         />
//       </View>
//     );
//   }
//   render() {
//     const {
//       selectedItem,
//       goToDetail,
//       position,
//       detailItem,
//       goBackRequested,
//       phase,
//     } = this.state;

//     return (
//       <SharedElementRenderer>
//         <View style={styles.container}>
//           <ToolbarBackground
//             isHidden={phase !== 'phase-1' && phase !== 'phase-2'}
//           />
//           {this.renderPage()}
//         </View>
//       </SharedElementRenderer>
//     );
//   }
// }

// export default JobHistoryList;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });