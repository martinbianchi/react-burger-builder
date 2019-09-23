import React, { useState } from 'react';

import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(prevState => !prevState);
    }

        return (<Aux>
            <Toolbar
                isAuth={props.isAuthenticated}
                openSideDrawer={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={props.isAuthenticated}
                closed={sideDrawerClosedHandler}
                open={showSideDrawer} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>)
}

const mapStateToPros = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToPros)(layout);