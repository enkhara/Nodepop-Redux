import { getAdverts } from './selectors';

describe('getAdverts', () => {
	const data = [
		{ createdAt: '1', id: 'a' },
		{ createdAt: '5', id: 'b' },
	];

	test('should return all adverts', () => {
		const result = getAdverts({ adverts: { data } });
		expect(result).toHaveLength(data.length);
	});

	test('should return adverts sorted by createdAt desc', () => {
		const result = getAdverts({ adverts: { data } });
		expect(result[0].id).toBe('b');
	});
});
