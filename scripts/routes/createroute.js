const Router = require('koa-router');
const createQueries = require('../db/queries/create_querry');

const router = new Router();
const BASE_URL = `/create`;

module.exports = router.routes();
