const Product = ( { id, image, title, brand, price} ) => {
    return (
        <div className="card card--product">

            <div className="card-image">
                <figure className="image">
                    <img src={image} alt={title} />
                </figure>
            </div>

            <div className="card-content has-text-centered">
                <h3 className="title is-block is-4">{ title }</h3>
                <p className="subtitle is-6">{ brand }</p>
                <div className="is-flex is-justify-content-space-between">
                    <p className="title mb-0 is-3">
                        <strong>${price}</strong>
                    </p>
                    <button type="button" className="button is-rounded is-primary">Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product
