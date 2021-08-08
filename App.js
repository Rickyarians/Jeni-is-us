import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ContactListPage from './src/components/ContactListPage';
import ContactDetailPage from './src/components/ContactDetailPage';
import ContactUpdatePage from './src/components/ContactUpdatePage';
import ContactAddPage from './src/components/ContactAddPage';

const MainNavigator = createStackNavigator({
  ContactList: {screen: ContactListPage},
  ContactDetail: {screen: ContactDetailPage},
  ContactUpdate: {screen: ContactUpdatePage},
  ContactAdd: {screen: ContactAddPage}
});


const App = createAppContainer(MainNavigator);

export default App;
