import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Login } from './Login';

describe('Login', () => {
    it('renders without crashing given the required props', () => {
        const wrapper = shallow(<Login />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
