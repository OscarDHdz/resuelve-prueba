import React from 'react';

const ErrorNotification = ({message}) => {
  return (
    <div className="notification is-danger">
      {message}
    </div>
  )
}

export default ErrorNotification;