import React from 'react';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';

import { getUi } from '../../../store/selectors';
import { advertCreatedAction } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
function NewAdvertPage() {
	const dispatch = useDispatch();
	const { error } = useSelector(getUi);

	const handleSubmit = async (newAdvert) => {
		await dispatch(advertCreatedAction(newAdvert));
	};

	if (error?.statusCode === 401) {
		return <Redirect to="/login" />;
	}

	return (
		<Layout>
			<NewAdvertForm onSubmit={handleSubmit} />
		</Layout>
	);
}

NewAdvertPage.propTypes = {
	history: T.shape({
		push: T.func.isRequired,
	}).isRequired,
};

export default NewAdvertPage;
