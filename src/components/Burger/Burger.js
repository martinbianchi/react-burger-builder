import React from 'react';

import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient type={igKey} key={igKey + i} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingrendients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
            
        </div>
    );
}

export default burger;