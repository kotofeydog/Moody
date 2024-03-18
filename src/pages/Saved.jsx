import { Fragment, useContext } from "react";
import Container from "../components/container";
import { Flex } from "antd";
import Cart from "../components/Cart";
import Product from "../images/product2.png"
import Breadcrumb from "../components/Breadcrumb";
import { ContextSaved } from "../context/saved";

const Saved = () => {
    const { savedProducts } = useContext(ContextSaved);

    const savedCart = savedProducts.map((item, index) => {
        return <Fragment key={index}>
            <Cart
                image={item.image} type={"product"} 
                href={`/catalog/product/${item.id}`}
                vertical title={item.title} saved={item.saved}
                stars={item.stars} price={item.price} />
        </Fragment>
    })
    return (
        <Fragment>
            <Breadcrumb current={"Like more"} />
            <section className="Saved">
                <Container>
                    <Flex gap={25}>
                        {savedCart}
                    </Flex>
                </Container>
            </section>
        </Fragment>
    )
}

export default Saved;