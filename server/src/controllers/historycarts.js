const auth = require("./auth");
const models = require("../models");

const createHistoryCart = async (request, response) => {
  const user = await auth.validUser(request, response);
  if (user === "false") return;

  const cart = new models.HistoryCart({
    userId: user._id,
    paid: true,
    subtotal: request.body.subtotal,
  });
  const cartReturn = await cart.save();
  if (!cartReturn) return response.status(200).json({ error: "invalid" });
  if (request.body.products && request.body.products.length > 0) {
    for (item of request.body.products) {
      const product = await models.Product.findById(item.productId);
      if (product) {
        const cartQ = new models.HistoryCartQ({
          cartId: cartReturn._id,
          productId: product._id,
          quantity: item.quantity,
        });
        const returned = await cartQ.save();
        if (!returned) return response.status(200).json({ error: "invalid" });
      }
    }
  }
  response.status(200).json({
    id: cartReturn._id,
    userId: request.body.userId,
    timestamp: cartReturn.timestamp,
    paid: true,
    subtotal: request.body.subtotal,
    products: request.body.products,
  });
};

const getHistoryCarts = async (request, response) => {
  const user = await auth.validUser(request, response);
  if (user === "false") return;

  const match = await models.HistoryCart.find({});
  if (match && match.length > 0) {
    let result = [];
    for (item of match) {
      const cartQ = await models.HistoryCartQ.find({ cartId: item._id });
      let products = [];
      for (temp of cartQ) {
        products = products.concat({
          productId: temp.productId,
          quantity: temp.quantity,
        });
      }
      result = result.concat({
        id: item._id,
        userId: item.userId,
        timestamp: item.timestamp,
        paid: item.paid,
        subtotal: item.subtotal,
        products: products,
      });
    }
    return response.status(200).json(result);
  }
  response.status(200).json({ error: "invalid" });
};

const getHistoryCart = async (request, response) => {
  const user = await auth.validUser(request, response);
  if (user === "false") return;

  const id = request.params.id;
  const match = await models.HistoryCart.findById(id);
  if (match) {
    const cartQ = await models.HistoryCartQ.find({ cartId: match._id });
    let products = [];
    for (temp of cartQ) {
      products = products.concat({
        productId: temp.productId,
        quantity: temp.quantity,
      });
    }
    const result = {
      id: match._id,
      userId: match.userId,
      timestamp: match.timestamp,
      paid: match.paid,
      subtotal: match.subtotal,
      products: products,
    };
    return response.status(200).json(result);
  }
  response.status(200).json({ error: "invalid" });
};

const getHistoryUserCarts = async (request, response) => {
  const user = await auth.validUser(request, response);
  if (user === "false") return;

  const match = await models.HistoryCart.find({ userId: user._id });
  if (match && match.length > 0) {
    let result = [];
    for (item of match) {
      const cartQ = await models.HistoryCartQ.find({ cartId: item._id });
      let products = [];
      for (temp of cartQ) {
        products = products.concat({
          productId: temp.productId,
          quantity: temp.quantity,
        });
      }
      result = result.concat({
        id: item._id,
        userId: item.userId,
        timestamp: item.timestamp,
        paid: item.paid,
        subtotal: item.subtotal,
        products: products,
      });
    }
    return response.status(200).json(result);
  }
  response.status(200).json({ error: "invalid" });
};

const deleteHistoryCart = async (request, response) => {
  const user = await auth.validUser(request, response);
  if (user === "false") return;

  const id = request.params.id;
  const cartReturn = await models.HistoryCart.deleteOne({ _id: id });
  if (!cartReturn.acknowledged)
    return response.status(200).json({ error: "invalid" });

  await models.HistoryCartQ.deleteMany({ cartId: id });

  response.status(200).json({ status: "OK" });
};

const deleteHistoryCarts = async (request, response) => {
  const user = await auth.validUser(request, response);
  if (user === "false") return;
  await models.HistoryCartQ.deleteMany({});
  await models.HistoryCart.deleteMany({});
  response.status(200).json({ status: "OK" });
};

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const stripeCheckout = async (req, res) => {
  // console.log("stripeCheckout")
  // response.status(200).json({url: "hi"})
  try {
      // Create a checkout session with Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card","alipay","afterpay_clearpay"],
        // For each item use the id to get it's information
        // Take that information and convert it to Stripe's format
        line_items: req.body.items.map(({ id, title, price, quantity }) => {
          ///const storeItem = storeItems.get(id)
          return {
            price_data: {
              currency: "aud",
              product_data: {
                name: title,
              },
              unit_amount: price*100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10
            },
            quantity: quantity,
          }
        }),
        mode: "payment",
        // Set a success and cancel URL we will send customers to
        // These must be full URLs
        // In the next section we will setup CLIENT_URL
        shipping_address_collection: {
          // Specify which shipping countries Checkout should provide as options for shipping locations
          allowed_countries: ['AU', 'GB', 'NZ', 'US'],
        },
        success_url: `${process.env.CORS_CLIENT_DOMAIN}/success`,
        cancel_url: `${process.env.CORS_CLIENT_DOMAIN}/cancel`,
      })
      //res.redirect(303, session.url);
      res.json({ url: session.url })
    } catch (e) {
      // If there is an error send it to the client
      res.status(500).json({ error: e.message })
    }
}

module.exports = {
  createHistoryCart,
  getHistoryCarts,
  getHistoryCart,
  getHistoryUserCarts,
  deleteHistoryCart,
  deleteHistoryCarts,
  stripeCheckout,
};
