import React from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar, TextInput, ToastAndroid} from 'react-native';
import tailwind from 'tailwind-rn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { apiCall } from "./../service/commonAction";
import endPoint from "./../service/endPoint";
import Loader from './Loader';
import { StackActions, NavigationActions } from 'react-navigation';

export default class ContactUpdatePage extends React.Component {

    static navigationOptions = {
        title: 'Update Contact',
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
          id: props.navigation.state.params.id,
          firstName: props.navigation.state.params.firstName,
          lastName: props.navigation.state.params.lastName,
          age: props.navigation.state.params.age,
          photo: props.navigation.state.params.photo
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

      BacktoUpdate = () => {
        const { navigation } = this.props;
        navigation.pop();
        
      }

       handleSubmit = () => {
        const { navigation } = this.props;
        const { id, firstName, lastName, age, photo } = this.state;
        
        const api = endPoint.contact + '/' + id;
        const data = {
            firstName,
            lastName,
            age,
            photo: photo ? photo : 'https://cdn.antaranews.com/cache/800x533/2020/08/21/88CEE698-5897-4F26-971A-5162EEAB3942.jpeg'
        }
        apiCall.put(api, data, this.callbackSubmit);
      }


      callbackSubmit = (callback) => {
        console.log(callback)
        const { navigation } = this.props;
        if (callback !== null && callback.status == 201) {
          this.showToastWithGravityAndOffset('Update Contact Tersimpan ' + callback.data.message)
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'ContactList' })],
          });
          navigation.dispatch(resetAction); 
        } else {
          this.showToastWithGravityAndOffset('Gagal Update Contact ' + callback.data.message)
        }
        
      }


     
    
    

    render() {
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
               <TouchableOpacity  onPress={() => this.BacktoUpdate()}>
                           <View style={tailwind('bg-white w-9 rounded-lg py-3 px-3')}>
                               <FontAwesome size={14} style={tailwind('justify-end text-blue-400')} name='arrow-left' />
                           </View>
                       </TouchableOpacity>
               </View>
               <View style={tailwind('flex-none')}>
                     <Text style={tailwind('text-3xl font-bold text-white tracking-wide')}>Update Contact</Text>
               </View>
           </View>
          
             
           </View>
            </View>

            <View style={tailwind('flex-1 px-2')}>
                    <View style={{flex: 1, paddingTop:20, paddingHorizontal: 20}}>
                        <View style={tailwind('my-2')}>
                            <Text style={tailwind('text-xl text-gray-600 font-bold')}>First Name</Text>
                            <TextInput 
                            value={this.state.firstName}
                            onChangeText={(value) => this.setState({firstName: value})}
                            style={styles.inputStyle}
                            />
                        </View>
                        <View style={tailwind('my-2')}>
                            <Text style={tailwind('text-xl text-gray-600 font-bold')}>Last Name</Text>
                            <TextInput 
                             value={this.state.lastName}
                            onChangeText={(value) => this.setState({lastName: value})}
                            style={styles.inputStyle}
                            />
                        </View>
                        <View style={tailwind('my-2')}>
                            <Text style={tailwind('text-xl text-gray-600 font-bold')}>Age</Text>
                            <TextInput 
                            value={this.state.age.toString()}
                            placeholder='Age'
                            keyboardType={"numeric"}
                            onChangeText={(value) => this.setState({age: value})}
                            style={styles.inputStyle}
                            />
                        </View>
                        <View style={tailwind('my-2')}>
                            <Text style={tailwind('text-xl text-gray-600 font-bold')}>Photo</Text>
                        <TextInput 
                        placeholder='Photo URL'
                        value={this.state.photo}
                        onChangeText={(value) => this.setState({photo: value})}
                        style={styles.inputStyle}
                        />
                        </View>
                        <TouchableOpacity
                        style={[tailwind('bg-blue-400 py-4 my-4 px-4 rounded-2xl'), {elevation:  1}]}
                        activeOpacity = { .5 }
                        onPress={ this.handleSubmit }
                        >
                            <Text style={tailwind('text-center text-white text-xl font-bold tracking-wide')}> Update </Text>
                    </TouchableOpacity>
                </View>

                
            </View>
           
        </View>
      )
    }
}

const styles = StyleSheet.create({
    inputStyle : {
      height: 42, 
      borderColor: 'lightgrey', 
      borderBottomWidth: 2, 
      marginVertical: 10, 
      paddingLeft: 10
    },
});
