import React from 'react';
import T from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import { loginAction, resetError } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

function LoginPage() {
	const dispatch = useDispatch();
	const { isLoading, error } = useSelector(getUi);

	const handleSubmit = async (credentials) => {
		dispatch(loginAction(credentials));
	};

	return (
		<div>
			<LoginForm onSubmit={handleSubmit} />
			{isLoading && <p>...login in nodepop</p>}
			{error && (
				<div onClick={() => dispatch(resetError())} style={{ color: 'red' }}>
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
