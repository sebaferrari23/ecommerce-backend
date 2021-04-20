import {useState, useEffect} from 'react';
import ProductsList from '../Product/ProductsList';
import Spinner from '../general/Spinner';

const FeaturedProducts = () => {

    const [fetchProducts, setFetchProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8080/productos/listar")
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                console.log(data)
                setFetchProducts(data)
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setError(error);
            })
            .finally(() =>{
                setLoading(false)
            })

        setLoading(false);
    }, []);

    return (
        <div className="mb-6">
            { error ? 
                <p>Ha ocurrido un error al cargar los productos</p> : 
                loading ? 
                <Spinner /> :
                fetchProducts.length &&
                <ProductsList productsList={fetchProducts} productsTitle="New products" />
            }
        </div>
    )
}

export default FeaturedProducts