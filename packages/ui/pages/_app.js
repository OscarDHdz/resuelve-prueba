import React from 'react';
import 'bulma/css/bulma.min.css';

const AppWrapper = ({Component, pageProps}) => {
  return (
    <Component {...pageProps}/>
  )
}

export default AppWrapper;