import Document from './document';

// TODO getSchema, testConnection

export default class DataSource extends Document {
	constructor(client, id) {
		super(client, 'datasources', id);
	}
}
