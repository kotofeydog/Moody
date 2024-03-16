import { Fragment, useContext } from "react";
import Container from "../container";
import "./also-buy.scss"
import Cart from "../Cart";
import Product from "../../images/product3-0.png"
import { Flex } from "antd";
import Img from "../image";
import ArrowLeft from "../../images/arrow-left.svg"
import ArrowRight from "../../images/arrow-right.svg"
import Title from "../Title";
import { Context } from "../../Context";

const AlsoBuy = ({ className }) => {
    className = `Also-buy ${className}`;

    const { Data } = useContext(Context)

    const product = Data?.slice((Data.length - 1) - 3)
        .map(product => {
            return <Fragment key={product.id}>
                <Cart
                    image={product.image}
                    title={product.title}
                    type={"product"}
                    vertical
                    colors={product.colors}
                    href={`/catalog/product/${product.id}`}
                    price={product.price}
                />
            </Fragment>
        })


    return (
        <Fragment>
            <section className={className}>
                <Container className={`Also-buy__container`}>
                    <Title level={"h2"}>Also You May Like</Title>
                    <Flex gap={24} align={"center"} >
                        {product}
                    </Flex>

                    <Flex className="Also-buy__arrows" justify={"space-between"}>
                        <Img src={ArrowLeft} alt={`Arrow`} />
                        <Img src={ArrowRight} alt={`Arrow`} />
                    </Flex>
                </Container>
            </section>
        </Fragment>
    )
}

export default AlsoBuy;