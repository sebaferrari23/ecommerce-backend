import Product from './Product'

const ProductsList = ({productsTitle, productsList}) => {
    return (
        <>
            <h3 className="title is-uppercase mb-6">{ productsTitle }</h3>
            <div className="columns is-multiline">
                { productsList.length && productsList.map((product) => {
                    return (
                        <div className="column is-4" key={product.id}>
                            <Product 
                                id={product.id}
                                image={product.foto}
                                title={product.nombre}
                                brand={product.descripcion}
                                price={product.precio}
                                quantity={product.stock}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default ProductsList
