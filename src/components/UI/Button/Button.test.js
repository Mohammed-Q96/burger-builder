import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import Button from './Button';

const props = {
  children: 'test-text',
  active: false,
  clicked: jest.fn(),
};
test('Button render with out error', () => {
  const wrapper = setupShallowWrapper(Button, props);
  expect(wrapper).toHaveLength(1);
});
test('Button should call the passed handler', () => {
  const wrapper = setupShallowWrapper(Button, props);
  wrapper.find('button').simulate('click');
  expect(props.clicked).toHaveBeenCalled();
});
test('Button should view the passed children', () => {
  const wrapper = setupShallowWrapper(Button, props);
  expect(wrapper.text()).toContain(props.children);
});
