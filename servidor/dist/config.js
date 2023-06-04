"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var config = {
  host: 'localhost',
  user: 'root',
  password: 'sgz7MHM8@',
  database: 'tasks_db',
  timezone: 'utc' //<-here this line was missing
};
exports.config = config;