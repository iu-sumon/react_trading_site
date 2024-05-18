import axios from "axios";
// import { notification } from 'antd';

const errorHandler = (error) => {
  console.log("error", error)
  alert('server error occured')
  if (error.response && error.response.data) {
    if (error.response.data.errors) {
      const errorMsg = error.response.data.errors;
      errorMsg.forEach((ele) => {
        // notification.error({
        //   message: 'Error',
        //   description: ele
        // });
      })
    } else if (error.response.data) {
      // notification.error({
      //   message: 'Error',
      //   description: error.response.data.message
      // });
    }
  } else {
    if (!axios.isCancel(error) && error.message === 'Network Error') {
      // notification.error({
      //   message: 'Error',
      //   description: 'Maybe you are offline. Please Try again!'
      // });
    } else {
      // notification.error({
      //   message: 'Error',
      //   description: 'Failed. Please try again!'
      // });
    }
  }

};

export default errorHandler;
