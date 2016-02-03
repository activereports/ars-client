import Document from './document';
import DocumentCollection from './documentCollection';
import mimeType from './mimeType';
import _ from 'lodash';

function makeCollection(client, collectionName) {
	const collection = new DocumentCollection(client, collectionName);
	const documentFn = function (id) {
		if (!id) return collection;
		return new Document(client, collectionName, id);
	};

	// extend documentFn with collection API to reduce mistakes
	for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(collection))) {
		const method = collection[name];
		if (_.isFunction(method)) {
			documentFn[name] = collection[name].bind(collection);
		}
	}

	return documentFn;
}

// TODO remove default options
const defaultOptions = {
	token: '$local_admin',
};

export default class ArsClient {
	constructor(options = defaultOptions) {
		this.options = options;
		this.token = options.token;
		this.reports = makeCollection(this, 'reports');
	}

	fetchJSON(url, options = {}) {
		const opts = {
			headers: {
				AuthToken: this.token,
				Accept: mimeType.json,
			},
			...options,
		};
		return fetch(url, opts).then(response => response.json());
	}

	delete(url) {
		return this.fetchJSON(url, { method: 'delete' });
	}
}
