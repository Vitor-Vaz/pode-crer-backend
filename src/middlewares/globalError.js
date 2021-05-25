// eslint-disable-next-line no-unused-vars
const express = require('express');
const AppError = require('../helper/AppError');

/**
 * @param {Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} _
 */

// eslint-disable-next-line no-unused-vars
const globalError = (err, req, res, _) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

module.exports = globalError;
