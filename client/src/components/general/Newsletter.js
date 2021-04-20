const Newsletter = () => {
    return (
        <section className="hero is-success pt-5 pb-5 is-bold">
            <div className="hero-body">
                <div className="container">
                    <div className="columns">

                        <div className="column is-10 is-offset-1 is-flex is-align-items-center is-justify-content-space-between">

                            <div className="block mb-0">
                                <h3 className="title is-uppercase is-4 mb-0 mr-6">Subscribe to our newsletter</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>

                            <form action="#">
                                <div className="field has-addons">
                                    <div className="control">
                                        <input className="input  is-rounded" type="email" placeholder="name@example.com" />
                                    </div>
                                    <div className="control">
                                        <button type="submit" className="button is-dark is-rounded">Submit</button>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
