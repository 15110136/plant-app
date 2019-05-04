
import React from 'react'
import { Card, Icon, Button } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import avatar from '../assets/images/avatar.png'
const mainColor='#01C89E'

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            <View style = {styles.headerContainer}>
              <ImageBackground
                style={styles.headerBackgroundImage}
                blurRadius={10}
                source={avatar}
              >
                <View style={styles.headerColumn}>
                  <Image
                    style={styles.userImage}
                    source={avatar}
                  />
                  <Text style={styles.userNameText}>Nhan Nguyen</Text>
                  <View style={styles.userAddressRow}>
                    <View>
                      <Icon
                        name="place"
                        underlayColor="transparent"
                        iconStyle={styles.placeIcon}                  
                      />
                    </View>
                    <View style={styles.userCityRow}>
                      <Text style={styles.userCityText}>
                        Ho Chi Minh, VietNam
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.TouchStyle} >
                <View style={styles.telContainer}>
                  <View style={styles.iconRow}>                   
                      <Icon
                        name="call"
                        underlayColor="transparent"
                        iconStyle={styles.telIcon}
                      />                  
                  </View>
                  <View style={styles.telRow}>
                    <View style={styles.telNumberColumn}>
                      <Text style={styles.telNumberText}>+(84) 356658801</Text>
                    </View>
                    <View style={styles.telNameColumn}>                     
                        <Text style={styles.telNameText}>Di động</Text>  
                    </View>
                  </View>                 
                </View>
              </View>               
              <View>
                <View style={styles.emailContainer}>
                  <View style={styles.iconRow}>                   
                      <Icon
                        name="email"
                        underlayColor="transparent"
                        iconStyle={styles.emailIcon}                      
                      />                    
                  </View>
                  <View style={styles.emailRow}>
                    <View style={styles.emailColumn}>
                      <Text style={styles.emailText}>Leonhan88@gmail.com</Text>
                    </View>
                    <View style={styles.emailNameColumn}>                      
                        <Text style={styles.emailNameText}>Cá nhân</Text> 
                    </View>
                  </View>
                </View>
              </View>             
             
              <View>
                <View style={styles.emailContainer}>
                  <View style={styles.iconRow}>                   
                      <Icon
                        name="star"
                        underlayColor="transparent"
                        iconStyle={styles.emailIcon}                      
                      />                    
                  </View>
                  <View style={styles.emailRow}>
                    <View style={styles.emailColumn}>
                      <Text style={styles.emailText}>50 </Text>
                    </View>   
                    <View style={styles.emailNameColumn}>                      
                        <Text style={styles.emailNameText}>Điểm</Text> 
                    </View>                   
                  </View>
                </View>
              </View>
              <TouchableOpacity>
                <View style={styles.emailContainer}>
                  <View style={styles.iconRow}>                   
                      <Icon
                        name="history"
                        underlayColor="transparent"
                        iconStyle={styles.emailIcon}                      
                      />                    
                  </View>
                  <View style={styles.historyRow}>
                    <View style={styles.emailColumn}>
                      <Text style={styles.emailText}>Lịch sử thực hiện</Text>
                    </View>                                         
                  </View>
                  <View style={styles.smsRow}>
                    <Icon
                      name="chevron-right"
                      underlayColor="transparent"
                      iconStyle={styles.smsIcon}                    
                    />
                  </View>
                </View>
              </TouchableOpacity>        
              <Button
              style={styles.btnLogout}
              title="Log out"
              color="gray"
              onPress={() => {}}
              />                    
          </Card>
        </View>      
    </ScrollView>      
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,    
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingBottom: 15,
  }, 
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {
    height:80,
  },
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 60,
    borderWidth: 3,
    height: 120,
    marginBottom: 5,
    width: 120,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
    marginLeft: 0,
  },
  iconRow: {
    flex:2,
    justifyContent: 'center',
  },
  smsIcon: {
    color: 'gray',
    fontSize: 30,
  },  smsRow: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  telIcon: {
    color: mainColor,
    fontSize: 30,
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  TouchStyle :{
    paddingTop : 150,    
  },
    emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
   emailIcon: {
    color: mainColor,
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  historyRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btnLogout:{
    position: 'relative',
    bottom:0,
    left:0,
    right:0,
    alignItems: 'stretch',
    fontSize:100,
  }
})