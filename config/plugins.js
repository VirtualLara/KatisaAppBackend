module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "ventas@katisailuminacionled.com",
      defaultReplyTo: "ventas@katisailuminacionled.com",
    },
  },
});
