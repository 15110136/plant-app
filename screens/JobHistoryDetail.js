import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Icon,
  FlatList,
} from 'react-native';
import data from '../constants/data'

class JobHistoryDetail extends Component {
  render() {
    return (
      <ScrollView style={{ paddingTop: 2 }}>
        <View>
          <View style={styles.toolbarBackground}/>
          <View style={styles.container}>
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
          </View>        
          <View style={styles.itemContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Monitor</Text>
              </View>
              <Text style={styles.amountText}>800$</Text>
            </View>
            <Text style={styles.vatText}>
              {`800$ X1 (Including VAT 10%)`}
            </Text>
          </View>     
          <View style={styles.itemContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>CPU</Text>
              </View>
              <Text style={styles.amountText}>1000$</Text>
            </View>
            <Text style={styles.vatText}>
              {`1000$ X1 (Including VAT 10%)`}
            </Text>
          </View>     
          <View style={styles.itemContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Main CPU</Text>
              </View>
              <Text style={styles.amountText}>358.00$</Text>
            </View>
            <Text style={styles.vatText}>
              {`358.00$ X1 (Including VAT 10%)`}
            </Text>
          </View>  
          <View style={styles.itemContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>RAM</Text>
              </View>
              <Text style={styles.amountText}>450.5$</Text>
            </View>
            <Text style={styles.vatText}>
              {`450.5$ X1 (Including VAT 10%)`}
            </Text>
          </View>  
        </View>
      </ScrollView>
    );
  }
}

export default JobHistoryDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderColor: '#E1E5E5',
    borderLeftWidth: 1,
    borderBottomWidth:2,
    borderRightWidth:2,
    borderTopWidth:0.5,
    marginTop: 50,
    position: 'relative',
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
  cellContainer: {
    flex: 1,
  },
  contentContainer: {
    height: 56,
    alignItems: 'center',
    flexDirection:'row',
  },
  toolbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 130,
    backgroundColor: '#008dff',
  },
  titleContainer: {
    flex: 1,
  },
  itemContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  rowContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {},
  amountText: {
    fontSize: 18,
    fontWeight: '900',
  },
  vatText: {
    fontSize: 10,
    color: 'gray',
  },
});
