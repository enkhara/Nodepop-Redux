import React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';
import { defaultFilters, filterAdverts } from './filters';
import { getAllAdverts } from '../../../api/adverts';
//import usePromise from '../../../hooks/usePromise';

import { useDispatch, useSelector } from 'react-redux';
import { getAdverts } from '../../../store/selectors';
import { advertsLoaded } from '../../../store/actions';

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = (filters) => storage.set('filters', filters);

function AdvertsPage() {
	// const {
	// 	isPending: isLoading,
	// 	error,
	// 	execute,
	// 	data: adverts,
	// } = usePromise([]);
	const [filters, setFilters] = React.useState(getFilters);
	const dispatch = useDispatch();
	const adverts = useSelector(getAdverts);

	React.useEffect(() => {
		getAllAdverts().then((adverts) => dispatch(advertsLoaded(adverts)));
	}, []);

	React.useEffect(() => {
		saveFilters(filters);
	}, [filters]);

	//TODO: gestionar error
	if (error?.statusCode === 401) {
		return <Redirect to="/login" />;
	}

	const filteredAdverts = filterAdverts(adverts, filters);

	return (
		<Layout>
			{adverts.length > 0 && (
				<FiltersForm
					initialFilters={filters}
					defaultFilters={defaultFilters}
					prices={adverts.map(({ price }) => price)}
					onFilter={setFilters}
				/>
			)}
			{filteredAdverts.length ? (
				<AdvertsList adverts={filteredAdverts} />
			) : (
				<EmptyList advertsCount={adverts.length} />
			)}
		</Layout>
	);
}

export default AdvertsPage;
