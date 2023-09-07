import { useState, useEffect } from "react"
import { fetchCart } from "../../utilities/cart-service";

export default function Cart () {
    const [cartItems, setCartItems] = useState([])
    const [totalAmount, setTotalAmount] = useState(0);

    function updateQuantity(productId, amount) {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
      
        if(cart[productId]) {
          cart[productId].quantity += amount;
      
          if(cart[productId].quantity <= 0) {
            delete cart[productId];
          }
      
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }
     const checkout = () => {
        //logic to handle checkout
            console.log(localStorage.getItem("cart"),"your order has been placed")
            localStorage.removeItem("cart")
            setCartItems([])
     }
     const handleIncrement = (productId) => {
        updateQuantity(productId, 1);
        // Refresh cart data
        setCartItems(getCart());
    }

    const handleDecrement = (productId) => {
        updateQuantity(productId, -1);
        // Refresh cart data
        setCartItems(getCart());
    }

    function calculateTotal(price, quantity){
        return cartItems.reduce((acc, currItem) => {
            return acc + (currItem.price * currItem.quantity)
        },0)
      }
      function getCart(){
        const cart = JSON.parse(localStorage.getItem('cart')) || {}
        return Object.values(cart)
      }

      async function fetchCartData() {
        try {
          const cartData = await fetchCart();
          setCartItems(cartData.products || []);
          setTotalAmount(cartData.totalAmount || 0);
        } catch (error) {
          console.error(error);
        }
      }
  
      useEffect(() => {
    
        fetchCartData();
      }, []);
      
    return (
        <div>
            <h1>All orders</h1>
            {cartItems.map((item)=> (
                <div key={item._id}>
                <img src={item.images[0]} alt={item.name}/>
                <h2>{item.name} - Quantity: {item.quantity}</h2>
                <p>{item.product_description}</p>
                <p>{item.price}</p>
                <button onClick={() => handleIncrement(item._id)}>+</button>
                <button onClick={() => handleDecrement(item._id)}>-</button>
                 </div>
            ))}
            <button onClick={checkout}>Checkout</button>
            <div>
        <strong>Total: ${calculateTotal().toFixed(2)}</strong>
        </div>
        </div>
        
    )
}