import './Product.css'
import {Link} from 'react-router-dom'
import { getProducts } from '../../utilities/product-service';

import {useState, useEffect} from "react"
export default function Products(props){
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

		async function handleRequest(){
      try {
        const productsData = await getProducts();
        if(productsData.length){
          // console.log(productsData)
          setProducts(productsData);
          setIsLoading(false);
        }else {
          setIsLoading(false);
          throw Error(productsData)
        }
      } catch (err) {
      console.log(err);
      }
    }

    useEffect(()=>{
      handleRequest()
    }, [])
  
    console.log(`There are ${products.length} products available to render`);

    const loaded = () => {
      return products?.map((p) => {
        return (
          <div key={p._id}>
            <h3>{p.name}</h3>
            <img className="front-image" src={p.images[0]} alt="front-image" />
            <img className="back-image" src={p.images[1]} alt="back-image" />
            <Link to={`/products/${p._id}`}>Details</Link>
            <p>{p.price}</p>
          </div>
        );
      });
    };
  
    const loading = () => (
      <div className="product-list">
        <h1>
          Loading...
          <span>
            <img
              className="spinner"
              src="https://freesvg.org/img/1544764567.png"
            />
          </span>
        </h1>
      </div>
    );
  
    return (
      <section className="product-list">
        {isLoading ? loading() : loaded()}
      </section>
    );
  }
  
   