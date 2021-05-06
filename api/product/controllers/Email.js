module.exports = {
  index: async (ctx) => {
    await strapi.plugins["email"].services.email.send({
      to: "ventas@katisailuminacionled.com",
      from: "ventas@katisailuminacionled.com",
      cc: "ventas@katisailuminacionled.com",
      bcc: "ventas@katisailuminacionled.com",
      replyTo: "ventas@katisailuminacionled.com",
      subject: "Use strapi email provider successfully",
      text: "Hello world!",
      html: "Hello world!",
    });
    ctx.send("Email sent!");
  },
};
