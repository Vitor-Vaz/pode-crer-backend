// eslint-disable-next-line no-unused-vars
const express = require('express');
const { clone } = require('ramda');
const admin = require('firebase-admin');
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
    const auth = admin.auth();
    const decodedToken = await auth.verifyIdToken(token);
    req.user = clone(decodedToken);

    next();
  } catch (error) {
    throw new AppError({ message: 'Token inválido', statusCode: 401 });
  }
};
