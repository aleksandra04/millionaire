import React from 'react';
import { shallow } from 'enzyme';
import Home from './home';

test('find welcome text in Home component', () => {
  const wrapper = shallow(<Home />);
  const welcome = 'Who wants to be a millionaire?';
  expect(wrapper.contains(welcome)).toEqual(true);
});
