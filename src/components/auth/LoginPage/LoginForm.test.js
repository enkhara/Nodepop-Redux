import React from 'react';
import { shallow } from 'enzyme';
//import '../../../setupTests';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
	const props = {
		onSubmit: jest.fn(),
	};

	const render = () => shallow(<LoginForm {...props} />);

	test('should render', () => {
		const wrapper = render();
		expect(wrapper.exists()).toBe(true);
	});

	test('snapshot testing', () => {
		const wrapper = render();
		expect(wrapper).toMatchSnapshot();
	});

	test('should submit credentials', () => {
		const credentials = {
			email: 'morgan',
			password: 'password',
			remember: false,
		};

		const wrapper = render();
		const usernameField = wrapper.find("[name='email']");
		//console.log(usernameField.debug());
		usernameField
			.props()
			.onChange({ target: { name: 'email', value: credentials.email } });

		const passwordField = wrapper.find("[name='password']");
		//console.log(passwordField.debug());
		passwordField
			.props()
			.onChange({ target: { name: 'password', value: credentials.password } });

		const checkboxField = wrapper.find("[name='remember']");
		//console.log(usernameField.debug());
		checkboxField
			.props()
			.onChange({ target: { name: 'remember', value: credentials.remember } });

		const form = wrapper.find('form');
		form.simulate('submit', { preventDefault: () => {} });

		expect(props.onSubmit).toHaveBeenCalledWith(credentials);
	});
});
