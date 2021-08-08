import React from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar, ToastAndroid} from 'react-native';
import tailwind from 'tailwind-rn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { apiCall } from "./../service/commonAction";
import endPoint from "./../service/endPoint";
import Loader from './Loader';

export default class ContactListPage extends React.Component {

    static navigationOptions = {
        title: 'Contact List',
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            contactList: [],
            loading: true
        }
    }

    

    componentDidMount() {
        this.fetchData();
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


    fetchData = () => {
        this.setState({
            loading: true
        });
        const api = endPoint.contact;
        const header = {
            headers: {
              "Content-Type": "application/json"
            },
            params: {}
          };
        apiCall.get(api, header, this.callbackSubmit);
    }

    callbackSubmit = (callback) => {
        console.log(callback)
        if (callback !== null && callback.status == 200) {
            this.showToastWithGravityAndOffset('Berhasil Get List Contact')
            this.setState({
                contactList: callback.data.data,
                loading: false
              });
          } else {
            this.showToastWithGravityAndOffset('Gagal Get List Contact')
          }
        
      }

    navigateToDetail(contactId) {
        const {navigate} = this.props.navigation;
        const params = {id: contactId, refetch: this.fetchData} 
        navigate('ContactDetail', params)
    }

    addContact = () => {
        const {navigate} = this.props.navigation;
        navigate('ContactAdd', {refetch: this.fetchData})
      }
      loadFallBack = (error) => {
        this.setState({ image: 'https://cdn.antaranews.com/cache/800x533/2020/08/21/88CEE698-5897-4F26-971A-5162EEAB3942.jpeg' })
      }

    renderViewItem = (item) => (
        <TouchableOpacity onPress={() => this.navigateToDetail(item.id)}>
             <View style={[tailwind('bg-white py-5 px-5 rounded-lg my-2'), styles.boxWithShadow]}>
                <View style={tailwind('flex flex-row')}>
                    <Image
                    style={[tailwind('rounded-full'),{width: 70, height: 70, marginRight: 15}]}
                    source={{ uri: item.photo }}
                    />
                    <View>
                    <Text style={tailwind('mt-2 mb-1 text-xl tracking-wide font-bold text-gray-800')}>{item.firstName} {item.lastName}</Text>
                    <Text style={tailwind('text-sm font-semibold text-gray-600')}>{item.age} years old</Text>
                    </View>
                </View>
                </View>
        </TouchableOpacity>
      );
        

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
                   <Text style={tailwind('text-3xl font-bold text-white tracking-wide')}>Contact</Text>
               </View>
               <View style={tailwind('flex-none')}>
                       <TouchableOpacity  onPress={() => this.addContact()}>
                           <View style={tailwind('bg-white w-9 rounded-lg py-3 px-3')}>
                               <FontAwesome size={14} style={tailwind('justify-end text-blue-400')}  name='plus' />
                           </View>
                       </TouchableOpacity>
               </View>
           </View>
           <View style={tailwind('items-center flex h-10 flex-row py-4 px-4 rounded-br-full rounded-bl-full bg-blue-400')}>
           </View>
             
           </View>
            </View>

            <View style={tailwind('flex-1 px-4')}>
                <View style={{flex: 1}}>
                    {!this.state.loading ? <View style={{flex: 1}}>
                        <FlatList
                            data={this.state.contactList}
                            renderItem={({item}) => this.renderViewItem(item)}
                            keyExtractor={({item}, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                
                </View> : <Loader />}
        
                </View>
            </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
    bgHeader: {
      backgroundColor: '#1A1A1A',
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 3
    }
  });

