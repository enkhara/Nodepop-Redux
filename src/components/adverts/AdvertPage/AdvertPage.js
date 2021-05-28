import React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAdvert, deleteAdvert } from '../../../api/adverts';
import usePromise from '../../../hooks/usePromise';
import { useDispatch, useSelector } from 'react-redux';
import { getAdverts, getUi } from '../../../store/selectors';
import { advertCreatedAction } from '../../../store/actions';

function AdvertPage() {
	const { advertId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const adverts = useSelector(getAdverts);
	const { loading, error } = useSelector(getUi);
	const {
		isPending: isLoading,
		//error,
		execute,
		data: advert,
	} = usePromise(null);

	React.useEffect(() => {
		getAdvert().then((adverts) => dispatch(advertCreatedAction(adverts)));
	}, []);

	const handleDelete = () => {
		execute(deleteAdvert(advertId)).then(() => history.push('/'));
	};

	if (error?.statusCode === 401) {
		return <Redirect to="/login" />;
	}

	if (error?.statusCode === 404) {
		return <Redirect to="/404" />;
	}

	return (
		<Layout>
			{adverts && <AdvertDetail {...adverts} onDelete={handleDelete} />}
		</Layout>
	);
}

export default AdvertPage;
