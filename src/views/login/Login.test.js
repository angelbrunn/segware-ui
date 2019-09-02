import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Login } from './Login';

describe('Login', () => {
    it('renders without crashing given the required props', () => {
        const wrapper = shallow(<Login />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    /*
    it('T1 - Test username', () => {
        const wrapper = shallow(<Login />);
        wrapper
            .find('input[type="text"]')
            .simulate('change', {
                target: { name: 'username', value: 'user' }
            });
        expect(wrapper.state('username')).toEqual('user');
    });
    */
});
