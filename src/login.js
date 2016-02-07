import urljoin from 'url-join';

export function login(user, password, endpoint = '') {
	const path = '/api/accounts/login';
	const url = endpoint ? urljoin(endpoint, path) : path;
	return fetch(url, {
		method: 'post',
		body: JSON.stringify({ user, password }),
	})
	.then(r => r.json())
	.then(p => p.Token || '')
	;
}
