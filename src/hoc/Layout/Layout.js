import React, { Component } from 'react';

import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {

        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (<Aux>
            <Toolbar
                isAuth={this.props.isAuthenticated}
                openSideDrawer={this.sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={this.props.isAuthenticated}
                closed={this.sideDrawerClosedHandler}
                open={this.state.showSideDrawer} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>)
    }
}

const mapStateToPros = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToPros)(Layout);