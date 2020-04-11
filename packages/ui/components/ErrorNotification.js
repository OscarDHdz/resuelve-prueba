import React from 'react';

const ErrorNotification = ({message}) => {
  return (
    <div class="notification is-danger">
      {message}
    </div>
  )
}

export default ErrorNotification;