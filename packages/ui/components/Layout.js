import React, {Fragment} from 'react';
import Nav from './Nav';

const Layout = props => {
  return (
    <Fragment>
      <Nav/>
      {props.children}
    </Fragment>
  )
}

export default Layout;