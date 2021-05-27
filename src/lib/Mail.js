const { resolve } = require('path');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const mailConfig = require('../config/mail');

class Mail {
  constructor() {
    const {
      host, port, secure, auth,
    } = mailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
    this.setupTemplate();
  }

  setupTemplate() {
    const viewPath = resolve(__dirname, '..', 'views', 'emails');
    this.transporter.use(
      'compile',
      hbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      }),
    );
  }

  async sendMail(message) {
    await this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

module.exports = new Mail();
