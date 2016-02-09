import Document from './document';

// TODO validateQuery, executeQuery, etc API

export default class DataSet extends Document {
	constructor(client, id) {
		super(client, 'datasets', id);
	}
}
