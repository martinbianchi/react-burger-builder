import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../axios-order';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const burguerBuilder = props => {

    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const onAddIngredient = (igName) => dispatch(actions.addIngredient(igName));
    const onRemoveIngredient = (igName) => dispatch(actions.removeIngredient(igName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    const [isPurchasing, setIsPurchasing] = useState(false);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setIsPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth');
        }

    }

    const purchaseCancelHandler = () => {
        setIsPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    isAuth={isAuthenticated}
                    price={price}
                    purchaseable={updatePurchaseState(ings)}
                    disabled={disabledInfo}
                    ingredientAdded={onAddIngredient}
                    ingredientRemoved={onRemoveIngredient}
                    ordered={purchaseHandler} />
            </Aux>
        )

        orderSummary = <OrderSummary
            ingredients={ings}
            price={price}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler} />;
    }

    return (
        <Aux>
            <Modal show={isPurchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );

}


export default withErrorHandler(burguerBuilder, axios);