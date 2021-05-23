// eslint-disable-next-line no-unused-vars
const express = require('express');
const { clone } = require('ramda');
const admin = require('firebase-admin');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = async function ensureAuthentication(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error('Token inválido não existe');
  }

  const [, token] = authorization.split(' ');

  try {
    const auth = admin.auth();
    const decodedToken = await auth.verifyIdToken(token);
    req.user = clone(decodedToken);
    next();
  } catch (error) {
    throw new Error('Token inválido');
  }
};
