import {useState, useEffect} from 'react'
import { useParams } from "react-router"
import { getProduct } from "../../utilities/product-service"

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
    const addToCart = (product) => {
        
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
        </div>
      );
      
      const loading = () => {
        return <h1>Loading.........</h1>;
        // alternatively you can use the spinner
      };
      
      return product ? loaded() : loading();
    }