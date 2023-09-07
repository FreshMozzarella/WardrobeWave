const express = require('express')
const { Cart } = require('../models')

// EXPORT Controller Action
module.exports = {
	create,
	update
}

async function create(req, res, next) {
    try {
      res.json(await Cart.create(req.body));
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async function update(req, res, next) {
    try {
      res.json(
        await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      res.status(400).json(error);
    }
  }

