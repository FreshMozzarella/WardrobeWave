import {useState, useEffect} from 'react'
import { useParams } from "react-router"
import { getProduct } from "../../utilities/product-service"
import { createOrUpdateCart } from "../../utilities/cart-service";

export default function Show(){
    const [product, setProduct] = useState(null)
    const {id} = useParams();

    const handleRequest = async () => {
        try {
            const productData = await getProduct(id);
            setProduct(productData)
        } catch (err) {
            console.log(err)
        }
    }
    async function addToCart(product) {
      try {
        const cartData = {
          products: [{ productId: product._id, quantity: 1 }],
        };
  
        const response = await createOrUpdateCart(cartData);
        if (response.error) {
          throw new Error(response.error);
        }
  
        console.log("Cart updated:", response);
      } catch (err) {
        console.error(err);
      }
    }
  
    console.log(`Current Product: ${JSON.stringify(product)}`);
    useEffect(() => {
        handleRequest();
      }, [])
      const loaded = () => (
        <div className="product">
          <h1>Show Page</h1>
          <h2>{product.name}</h2>
          <h2>{product.product_description}</h2>
          <img src={product.images[0]} alt={product.name + " image"} />
          <img src={product.images[1]} alt={product.name + " image"} />
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      );
      
      const loading = () => {
        return <h1>Loading.........</h1>;
        // alternatively you can use the spinner
      };
      
      return product ? loaded() : loading();
    }