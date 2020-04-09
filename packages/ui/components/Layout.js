import React, {Fragment} from 'react';
import Head from 'next/head';
import Nav from './Nav';

const Layout = props => {
  return (
    <Fragment>
      <Head>
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      </Head>
      <Nav/>
      {props.children}
    </Fragment>
  )
}

export default Layout;