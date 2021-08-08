import React from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar, TextInput, ToastAndroid, Alert} from 'react-native';
import { call } from 'react-native-reanimated';
import tailwind from 'tailwind-rn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { apiCall } from "./../service/commonAction";
import endPoint from "./../service/endPoint";
import { StackActions, NavigationActions } from 'react-navigation'
import Loader from './Loader';

export default class ContactDetailPage extends React.Component {

    static navigationOptions = {
        title: 'Contact Detail',
        headerShown: false,
    }

    constructor(props) {
      super(props);
      this.state = {
        id: '',
        firstName: '',
        lastName: '',
        age: '',
        photo: 'rr',
        loading: true
      }
    }
  

    componentDidMount(){
      this.fetchDetailData();
    }

    fetchDetailData() {
      const { navigation: { state: { params: { id } } } } = this.props;
      const api = endPoint.contact + '/' + id;
      const header = {
        headers: {
          "Content-Type": "application/json"
        },
        params: {}
      };
    apiCall.get(api, header, this.callbackgetDetail);
    }

  callbackgetDetail= (callback) => {
      console.log(callback)

      if (callback !== null && callback.status == 200) {
        this.showToastWithGravityAndOffset('Berhasil Get Detail Contact')
        this.setState({
          id: callback.data.data.id,
          firstName: callback.data.data.firstName,
          lastName: callback.data.data.lastName,
          age: callback.data.data.age,
          photo: callback.data.data.photo,
          loading: false
        });
      } else {
        
        this.showToastWithGravityAndOffset('Gagal Get Detail Contact')
        const refetch = navigation.state.params.refetch;
        if(typeof refetch === 'function') {
          refetch(); 
          navigation.pop();
        }
      }
      
    }

    showToastWithGravityAndOffset = (text) => {
      ToastAndroid.showWithGravityAndOffset(
        text,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    };

    showAlertConfirmation = () => {
      Alert.alert(
          `Delete ${this.state.firstName}?`,
          `This will be delete ${this.state.firstName} & cannot be undone`,
          [
              {text: 'OK', onPress: () => this.deleteContact(this.state.id)},
              {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
    }
    
    BacktoList = () => {
      const { navigation } = this.props;
      const refetch = navigation.state.params.refetch;
        if(typeof refetch === 'function') {
          refetch(); 
          navigation.pop();
        }
    }

    deleteContact = (idcontact) => {
      const api = endPoint.contact + '/' + idcontact;
      const header = {
        headers: {
          "Content-Type": "application/json"
        },
        params: {}
      };
     apiCall.delete(api, header, this.callbackDelete);
    }

    callbackDelete= (callback) => {
      console.log(callback)
      if (callback !== null && callback.status == 200) {
        this.showToastWithGravityAndOffset('Berhasil Delete Contact')
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'ContactList' })],
        });
        navigation.dispatch(resetAction);  
      } else {
        this.showToastWithGravityAndOffset('Gagal Delete Contact')
      }  
    }

    navigateToUpdate = () => {
      const { firstName, lastName, age, photo, id } = this.state;
      const {navigate} = this.props.navigation;
      const params = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        age: age,
        photo: photo
      }
      navigate('ContactUpdate', params)
    }
    

    render() {
      const { firstName, lastName, age, photo, id, loading } = this.state;
      return (
        <View style={tailwind('flex flex-1 flex-col')}>
        <StatusBar
        animated={true}
        backgroundColor="#60A5FA"
        hidden={false} />
            {/* Header */}

            <View style={tailwind('flex-none')}>
                <View style={tailwind('flex flex-col')}>
                  
                  <View style={tailwind('items-center flex flex-row py-10 px-8 bg-blue-400')}>
                  <View style={tailwind('flex-1')}>
                  <TouchableOpacity  onPress={() => this.BacktoList()}>
                              <View style={tailwind('bg-white w-9 rounded-lg py-3 px-3')}>
                                  <FontAwesome size={14} style={tailwind('justify-end text-blue-400')} name='arrow-left' />
                              </View>
                          </TouchableOpacity>
                  </View>
                  <View style={tailwind('flex-none')}>
                        <Text style={tailwind('text-3xl font-bold text-white tracking-wide')}>Detail Contact</Text>
                  </View>
              </View>
              
                
              </View>
            </View>

            {/*  */}

            
            <View style={tailwind('flex-1 px-4 py-3')}>
                <View style={{flex: 1}}>
                    {!this.state.loading ? <View style={{flex: 1}}>
                       <View style={tailwind('bg-white rounded-lg py-5 px-3 flex-1')}>
                        <Image
                            style={[tailwind('rounded-full mt-2'), {width: 100, height: 100, alignSelf: 'center'}]}
                            source={{uri: photo}}
                            defaultSource={require('./../assets/default.png')}
                          />
                          <Text style={tailwind('text-center mt-5 text-3xl font-bold')}>{firstName} {lastName}</Text>
                          <Text style={tailwind('text-center my-2 text-sm text-gray-600')}>{age} years old</Text>

                         
                       </View>
                       <View style={tailwind('flex-none flex-row my-3')}>
                            <TouchableOpacity style={tailwind('flex-1 py-4 px-2 rounded-lg bg-blue-400 mx-2')} onPress={this.navigateToUpdate}>
                                  <View>
                                 
                                    <Text style={tailwind('text-center text-white text-lg')}>
                                      <FontAwesome size={14} style={tailwind('justify-end mr-4')} name='pencil' />
                                    </Text>
                                  </View>
                              </TouchableOpacity>
                              <TouchableOpacity style={tailwind('flex-1 py-4 px-2 rounded-lg bg-red-400 mx-2')}  onPress={this.showAlertConfirmation }>
                                  <View>
                                    <Text style={tailwind('text-center text-white text-lg')}>
                                      <FontAwesome size={14} style={tailwind('justify-end mr-4')} name='trash' />
                                    </Text>
                                  </View>
                              </TouchableOpacity>
                          </View>
                
                </View> : <Loader />}
        
                </View>
            </View>

          
           
           
        </View>
      )
    }
}

