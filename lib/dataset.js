'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _document = require('./document');

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO validateQuery, executeQuery, etc API

var DataSet = (function (_Document) {
	_inherits(DataSet, _Document);

	function DataSet(client, id) {
		_classCallCheck(this, DataSet);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(DataSet).call(this, client, 'datasets', id));
	}

	return DataSet;
})(_document2.default);

exports.default = DataSet;