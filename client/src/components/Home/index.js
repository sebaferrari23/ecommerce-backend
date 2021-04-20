import Hero from "./Hero"
import NewProducts from "./NewProducts"

const Home = () => {
    return (
        <>
            <Hero />
            <section className="section is-small">
                <div className="container">
                    <NewProducts />
                </div>
            </section>
        </>
    )
}

export default Home