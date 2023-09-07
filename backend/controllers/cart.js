const express = require('express');
const { Cart } = require('../models');

module.exports = {
  createOrUpdate,
};

async function createOrUpdate(req, res, next) {
  try {
    const cartId = req.params.id;
    const cartData = req.body;

    if (cartId) {
      const updatedCart = await Cart.findByIdAndUpdate(
        cartId,
        cartData,
        { new: true }
      );

      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      
      return res.json(updatedCart);
    } else {
      const createdCart = await Cart.create(cartData);
      return res.json(createdCart);
    }
  } catch (error) {
    res.status(400).json(error);
  }
}


