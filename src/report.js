import Document from './document';

// TODO parameters, caching, rendering, etc API

export default class Report extends Document {
	constructor(client, id) {
		super(client, 'reports', id);
	}
}
