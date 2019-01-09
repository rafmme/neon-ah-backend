"use strict";

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _yamljs = _interopRequireDefault(require("yamljs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var swaggerDocument = _yamljs.default.load('swagger.yaml');

var app = (0, _express.default)();
app.use(_express.default.json());
app.use('/docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocument));
app.get('/', function (req, res) {
  res.status(200).json('Welcome to Todos');
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  // eslint-disable-next-line
  console.log("Server started on ".concat(port));
});