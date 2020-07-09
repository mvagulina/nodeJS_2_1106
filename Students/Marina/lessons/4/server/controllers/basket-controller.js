let Basket = require("../db/models/basket");

module.exports = {
  async load(req, res) {
    let userBasket;
    try {
      let user_id = req.params.id;
      userBasket = await Basket.find({ user_id: user_id });
      if (!userBasket.length) {
        userBasket.push(
          await Basket.create({
            user_id: user_id,
            items: [],
          })
        );
      }
    } catch (error) {
      console.log(`Error loading basket: ${error}`);
      res.sendStatus(500);
    } finally {
      res.json(userBasket[0].items);
    }
  },
  async add(req, res) {
    try {
      let userBasket = await Basket.find({ user_id: req.params.id });
      if (userBasket.length) {
        let items = userBasket[0].items;
        items.push(req.body);
        await Basket.updateOne({ items: items });
        res.json({ status: true });
      }
    } catch (error) {
      console.log(`Error getting basket: ${error}`);
      res.sendStatus(500);
    }
  },
  async change(req, res) {
    try {
      let userBasket = await Basket.find({ user_id: req.params.id });
      if (userBasket.length) {
        let items = userBasket[0].items;
        let find = items.find((item) => item._id === req.body._id);
        find.amount += req.body.amount;
        await Basket.updateOne({ items: items });
        res.json({ status: true });
      }
    } catch (error) {
      console.log(`Error getting basket: ${error}`);
      res.sendStatus(500);
    }
  },
  async clear(req, res) {
    let userBasket;
    try {
      userBasket = await Basket.find({ user_id: req.params.id });
      if (userBasket.length) {
        await Basket.updateOne({ items: [] });
        res.json({ status: true });
      }
    } catch (error) {
      console.log(`Error deleting basket: ${error}`);
      res.sendStatus(500);
    } finally {
      res.json(userBasket[0].items);
    }
  },
};
