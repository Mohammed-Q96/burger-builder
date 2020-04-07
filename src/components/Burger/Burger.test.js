import setupWrapper from 'test/helpers/setupWrapper';
import BurgerIngredient from 'components/Burger/BurgerIngredient/BurgerIngredient';
import Burger from './Burger';

const props = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
};

test('BurgerBuilder render with out error', () => {
  const wrapper = setupWrapper(Burger, props);
  expect(wrapper.find('div').exists()).toBe(true);
});
test('should at lest contains four ', () => {
  const wrapper = setupWrapper(Burger, props);
  expect(wrapper.find(BurgerIngredient)).toHaveLength(2);
});
test('should show add ingredients on empty burger', () => {
  const wrapper = setupWrapper(Burger, props);
  expect(wrapper.find('p').text()).toContain(
    'Please start adding ingredients!',
  );
});
