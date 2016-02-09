require('es6-promise').polyfill();
require('isomorphic-fetch');
import Document from './document';
import Report from './report';
import DataSource from './datasource';
import DataSet from './dataset';
import DocumentCollection from './documentCollection';
import mimeType from './mimeType';
import urljoin from 'url-join';
import _ from 'lodash';

function makeDocument(client, collectionName, id) {
	switch (collectionName.toLowerCase()) {
	case 'reports':
		return new Report(client, id);
	case 'datasources':
		return new DataSource(client, id);
	case 'datasets':
		return new DataSet(client, id);
	default:
		return new Document(client, collectionName, id);
	}
}

function makeCollection(client, collectionName) {
	const collection = new DocumentCollection(client, collectionName);
	const documentFn = function (id) {
		if (!id) return collection;
		return makeDocument(client, collectionName, id);
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
	endpoint: '',
	token: '$local_admin',
};

export default class ArsClient {
	constructor(options = defaultOptions) {
		this.options = options;
		this.token = options.token;
		this.endpoint = options.endpoint;
		this.agents = makeCollection(this, 'agents');
		this.reports = makeCollection(this, 'reports');
		this.dataSources = makeCollection(this, 'datasources');
		this.dataSets = makeCollection(this, 'datasets');
		this.models = makeCollection(this, 'models');
		this.themes = makeCollection(this, 'themes');
		this.images = makeCollection(this, 'images');
		this.scheduleTemplates = makeCollection(this, 'scheduletemplates');
		this.schedules = makeCollection(this, 'schedules');
		this.styleSheets = makeCollection(this, 'stylesheets');
		this.tags = makeCollection(this, 'tags');
		this.users = makeCollection(this, 'users');
		this.roles = makeCollection(this, 'roles');
	}

	absurl(url) {
		return this.endpoint ? urljoin(this.endpoint, url) : url;
	}

	fetchJSON(url, options = {}) {
		const opts = {
			headers: {
				AuthToken: this.token,
				Accept: mimeType.json,
			},
			...options,
		};
		return fetch(this.absurl(url), opts).then(response => response.json());
	}

	delete(url) {
		return this.fetchJSON(url, { method: 'delete' });
	}
}
