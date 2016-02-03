import { postContent, defaultUploadOptions } from './upload';

export default class DocumentCollection {
	constructor(client, name) {
		this.client = client;
		this.name = name;
	}

	load() {
		return this.client.fetchJSON(`/api/${this.name}`);
	}

	scan() {
		return this.load();
	}

	upload(body, options = defaultUploadOptions) {
		return postContent(this.client, 'post', `${this.name}`, body, options);
	}
}
