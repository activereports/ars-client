import queryString from 'query-string';
import mimeType from './mimeType';
import _ from 'lodash';

export const defaultUploadOptions = {
	contentType: mimeType.json,
};

export function postContent(client, method, path, body, options = defaultUploadOptions) {
	const query = queryString.stringify(_.pick(options,
		'name',
		'description',
		'comment',
		'tagId',
		'connectionString',
		'default',
		'temporary',
		'overwrite',
		'nopatchref',
		'novalidation'
	));
	const url = `/api/${path}/content?${query}`;
	return fetch(url, {
		headers: {
			AuthToken: client.token,
			'Content-Type': options.contentType || mimeType.json,
		},
		method: method || 'post',
		body: _.isObject(body) ? JSON.stringify(body) : body,
	});
}

export function getContent(client, path, options = defaultUploadOptions) {
	const url = `/api/${path}/content`;
	return fetch(url, {
		headers: {
			AuthToken: client.token,
			Accept: options.contentType || mimeType.json,
		},
	}).then(response => response.json());
}
