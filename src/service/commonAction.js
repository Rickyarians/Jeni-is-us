import { NavigationActions, StackActions } from 'react-navigation';
import service from './index';

//------------------------------------------------------------------------------------------------------------------------=>
/*<<apiCall>>*/
//------------------------------------------------------------------------------------------------------------------------=>
export const apiCall = ({
  post: async (endpoint, data, callback, header, dataPass) => {
    await service.post(endpoint, data, header).then((result) => {
      var tempResult = result ? result : null;
      callback && callback.call(this, result, dataPass);

    }).catch(error => {
      var tempResult = error.response ? error.response : null;
      callback && callback.call(this, tempResult);
    });
  },
  put: async (endpoint, data, callback, header, dataPass) => {
    await service.put(endpoint, data, header).then((result) => {
      var tempResult = result ? result : null;
      callback && callback.call(this, result, dataPass);

    }).catch(error => {
      var tempResult = error.response ? error.response : null;
      callback && callback.call(this, tempResult);
    });
  },
  get: async (endpoint, header, callback, dataPass) => {
    await service.get(endpoint, header).then((result) => {
      callback && callback.call(this, result, dataPass);
    }).catch(error => {
      var tempResult = error.response ? error.response : null;
      callback && callback.call(this, tempResult);
    });
  },
  delete: async (endpoint, header, callback, dataPass) => {
    await service.delete(endpoint, header).then((result) => {
      var tempResult = result ? result : null;
      callback && callback.call(this, result, dataPass);

    }).catch(error => {
      var tempResult = error.response ? error.response : null;
      callback && callback.call(this, tempResult);
    });
  },
});

