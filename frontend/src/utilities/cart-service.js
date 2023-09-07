// cart-service.js

const BASE_URL = "http://localhost:4000/cart"

export const createOrUpdateCart = async (cartData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create/update cart: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchCart = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
