import React from 'react';
import T from 'prop-types';
import { useDispatch } from 'react-redux';

import usePromise from '../../../hooks/usePromise';
import { login } from '../../../api/auth';
import LoginForm from './LoginForm';
import { authLogin } from '../../../store/actions';

function LoginPage({ location, history }) {
	const { isPending: isLoading, error, execute, resetError } = usePromise();

	const dispatch = useDispatch();
	const onLogin = () => dispatch(authLogin());

	const handleSubmit = (credentials) => {
		execute(login(credentials))
			.then(onLogin())
			.then(() => {
				const { from } = location.state || { from: { pathname: '/' } };
				history.replace(from);
			});
	};

	return (
		<div>
			<LoginForm onSubmit={handleSubmit} />
			{isLoading && <p>...login in nodepop</p>}
			{error && (
				<div onClick={resetError} style={{ color: 'red' }}>
					{error.message}
				</div>
			)}
		</div>
	);
}

LoginPage.propTypes = {
	location: T.shape({ state: T.shape({ from: T.object.isRequired }) })
		.isRequired,
	history: T.shape({ replace: T.func.isRequired }).isRequired,
};

// const mapDispatchToProps = (dispatch) => ({
// 	onLogin: () => dispatch(authLogin()),
// });

// export default connect(null, mapDispatchToProps)(LoginPage);
export default LoginPage;
