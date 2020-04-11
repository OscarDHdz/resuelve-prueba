import React from 'react';
import Layout from '../components/Layout';
import 'bulma/css/bulma.min.css';
import '../public/style.css';

const AppWrapper = ({Component, pageProps}) => {
  return (
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  )
}

export default AppWrapper;