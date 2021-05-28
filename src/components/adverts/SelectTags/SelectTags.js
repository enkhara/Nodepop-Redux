import React from 'react';

//import { getTags } from '../../../api/adverts';
import { useDispatch, useSelector } from 'react-redux';
import { tagsLoadedAction } from '../../../store/actions';
import { getTags } from '../../../store/selectors';
import { CheckboxGroup } from '../../shared';

function SelectTags(props) {
	//const [tags, setTags] = React.useState([]);

	const dispatch = useDispatch();
	const tags = useSelector(getTags);

	React.useEffect(() => {
		dispatch(tagsLoadedAction());
	}, []);

	console.log('TAGS en selectTags', tags);
	return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
