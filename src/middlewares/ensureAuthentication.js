// eslint-disable-next-line no-unused-vars
const express = require('express');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const AppError = require('../helper/AppError');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = async function ensureAuthentication(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError({
      message: 'Token não existe',
      statusCode: 401,
    });
  }
  try {
    const [, token] = authorization.split(' ');
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    throw new AppError({ message: 'Token inválido', statusCode: 401 });
  }
};
