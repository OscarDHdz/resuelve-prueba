import React from 'react';
import 'bulma/css/bulma.min.css';
import '../public/style.css';

const AppWrapper = ({Component, pageProps}) => {
  return (
    <Component {...pageProps}/>
  )
}

export default AppWrapper;