import { ToastContainer, toast } from 'react-toastify';

const notify = (message, type) => {
  switch (type) {
  case 'success':
    return toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      className: 'foo-bar',
    });
  case 'failure':
    return toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      className: 'foo-bar',
    });
  default:
    toast(message, {
      position: toast.POSITION.TOP_CENTER,
      className: 'foo-bar',
    });
  }
};

export { notify, ToastContainer };
