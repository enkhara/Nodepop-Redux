import React from 'react';
import T from 'prop-types';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';

import { advertCreatedAction } from '../../../store/actions';
import { useDispatch } from 'react-redux';
function NewAdvertPage() {
	const dispatch = useDispatch();

	const handleSubmit = async (newAdvert) => {
		await dispatch(advertCreatedAction(newAdvert));
	};

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
