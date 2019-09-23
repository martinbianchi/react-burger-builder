import React, { useEffect } from 'react';
import axios from '../../axios-order';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const orders = props => {
    const { onFetchOrders, token, userId, loading, orders } = props;

    useEffect(() => {
        onFetchOrders(token, userId);
    }, [onFetchOrders, token, userId]);

    let ordersOutput = <Spinner />;
    if (!loading) {
        ordersOutput = orders
            .map(order =>
                <Order
                    ingredients={order.ingredients}
                    price={order.price}
                    key={order.id} />);
    }

    return (
        <div>
            {ordersOutput}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));