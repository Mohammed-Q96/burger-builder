/* eslint-disable react/no-access-state-in-setstate */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import useIsMounted from 'hooks/useIsMounted';
import {
  addIngredientAction,
  removeIngredientAction,
  authSetRedirectPath,
  inintIngredientThunk,
} from 'actions';
import axios from 'axiosInstances';
import withErrorHandler from 'HOC/withErrorHandler';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Burger from 'components/Burger/Burger';
import Spinner from 'components/UI/Spinner/Spinner';

export const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState(false);

  const isMounted = useIsMounted();
  const {
    history: { push },
    authenticated,
    setRedirectPath,
    inintIngredient,
    ingredients,
    totalPrice,
    removeIngredient,
    addIngredient,
  } = props;

  useEffect(() => {
    (async () => {
      try {
        await inintIngredient();
      } catch (error) {
        isMounted.current && setError(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const purchaseContinueHandler = useCallback(() => {
    push('/checkout');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const purchaseCancelHandler = useCallback(() => {
    setPurchasing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const purchaseHandler = useCallback(() => {
    if (authenticated) {
      setPurchasing(true);
    } else {
      setRedirectPath('/checkout');
      push('/auth');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  const updatePurchaseState = useCallback(() => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((acc, curr) => acc + curr, 0);
    return sum > 0;
  }, [ingredients]);

  const disabledInfo = useMemo(() => {
    return {
      ...ingredients,
    };
  }, [ingredients]);

  let orderSummary = ingredients ? (
    <OrderSummary
      ingredients={ingredients}
      price={totalPrice}
      purchaseContinued={purchaseContinueHandler}
      purchaseCancelled={purchaseCancelHandler}
    />
  ) : (
    <Spinner />
  );
  let burger = ingredients ? (
    <>
      <Burger ingredients={ingredients} />
      <BuildControls
        ingredientAdded={addIngredient}
        ingredientRemoved={removeIngredient}
        disabled={disabledInfo}
        purchasable={updatePurchaseState()}
        ordered={purchaseHandler}
        price={totalPrice}
        authenticated={authenticated}
      />
    </>
  ) : (
    <Spinner />
  );

  if (error) {
    burger = <p>sorry something went wrong</p>;
  }
  for (const key in disabledInfo) {
    if ({}.hasOwnProperty.call(disabledInfo, key)) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

const mapStateToProps = ({
  BurgerBuilder: { ingredients, totalPrice },
  auth: { token },
}) => ({
  ingredients,
  totalPrice,
  authenticated: Boolean(token),
});

const mapDispatchToProps = {
  addIngredient: addIngredientAction,
  removeIngredient: removeIngredientAction,
  inintIngredient: inintIngredientThunk,
  setRedirectPath: authSetRedirectPath,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));
