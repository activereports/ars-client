import { getContent, postContent, defaultUploadOptions } from './upload';

// TODO GET, PUT, PATCH permissions

export default class Document {
	constructor(client, collectionName, id) {
		this.client = client;
		this.collectionName = collectionName;
		this.id = id;
		this.path = `${collectionName}/${this.id}`;
	}

	load() {
		return this.client.fetchJSON(`/api/${this.path}`);
	}

	delete() {
		return this.client.delete(`/api/${this.path}`);
	}

	remove() {
		return this.delete();
	}

	getContent() {
		return getContent(this.client, this.path);
	}

	content() {
		return this.getContent();
	}

	updateContent(body, options = defaultUploadOptions) {
		return postContent(this.client, 'put', this.path, body, options);
	}
}
