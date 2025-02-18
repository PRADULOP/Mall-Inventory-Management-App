const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AciVcKojy44PW9aKiNAhF9_KU3VnG2H4q5BaOGvHGabr0B2ePx1RrH9GZ7G2WF3qY1n_JCIBC-p8pKzq",
  client_secret: "EEJvD65CyPDyJw7xqJ__W3cB1OXx87Vljdm2zPAkFmfoVnmJxEUivIFEmIJiGVsPFyoaWtxtdrJggzQM",
});

module.exports = paypal;
