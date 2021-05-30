import React from 'react';
import { shallow } from 'enzyme';
import '../../../setupTests';

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
});
