import { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/container";
import { Button, Col, Flex, Row, Select, Typography } from "antd";
import Img from "../components/image";
import Product from "./../images/product3-0.png"
import Title from "../components/Title";
import { IoMdClose } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import Input from "../components/Input";
import { MdOutlineEmail } from "react-icons/md";
import { default as Btn } from "../components/Button";
import AlsoBuy from "../components/Also-buy";
import { useCart } from "react-use-cart";

const Bag = () => {
    const {
        isEmpty, items, updateItemQuantity,
        totalUniqueItems, removeItem, cartTotal
    } = useCart();

    const CheckProducts = () => {
        if (isEmpty) return <Typography.Title level={2}>
            Bag is Empty
        </Typography.Title>;

        return items.map(product => {

            let value = 1;

            const handleValue = (e) => {
                updateItemQuantity(product.id, e);
                value = e;
            }

            return (
                <Fragment key={product.id}>
                    <Flex gap={18} className={`Shopping-bag__item`}>
                        <Img
                            src={product.image}
                            alt={product.title}
                            className={`Shopping-bag__image`}
                        />

                        <div className="Shopping-bag__item-content">
                            <Title bodyText={"p"} className={`Shopping-bag__item-title`}>
                                {product.title}
                            </Title>

                            <Title level={"h3"} className={`Shopping-bag__item-price`}>
                                {product.price} $
                            </Title>

                            <ol className={`list-none Shopping-bag__item-list`}>
                                <li className={`Shopping-bag__item-list__item`}>
                                    Art. No.: {product.id}
                                </li>
                                <li className={`Shopping-bag__item-list__item`}>
                                    Color: {product.colors.join(", ")}
                                </li>
                                <li className={`Shopping-bag__item-list__item`}>
                                    Size: {product.size}
                                </li>
                                <li className={`Shopping-bag__item-list__item`}>
                                    Total: {
                                        product.quantity * product.price
                                    }
                                </li>
                            </ol>

                            <Flex gap={6}>
                                <Button icon={<IoHeartOutline />} />

                                <Select
                                    defaultValue={value}
                                    onChange={handleValue}
                                    options={[
                                        { value: 1, label: 1 },
                                        { value: 2, label: 2 },
                                        { value: 3, label: 3 },
                                        { value: 4, label: 4 },
                                        { value: 5, label: 5 },
                                    ]}
                                />
                            </Flex>

                            <Button
                                icon={<IoMdClose />}
                                className={`Shopping-bag__item-close`}
                                onClick={() => removeItem(product.id)}
                            />
                        </div>
                    </Flex>
                </Fragment>
            )
        })
    }

    return (
        <Fragment>
            <Breadcrumb />

            <section className="Shopping-bag">
                <Container>
                    <Typography.Title level={2} className={"Shopping-bag__title"}>
                        Shopping bag
                    </Typography.Title>

                    <Row className={`Shopping-bag__row`} justify={"space-between"}>
                        <Col span={13} className={`Shopping-bag--bag`}>
                            <CheckProducts />
                        </Col>

                        <Col span={10} className={`Shopping-bag__order`}>
                            <form className={`Shopping-bag__form`}>
                                <label>
                                    <Title level={"h3"} className={`Shopping-bag__form-label__title`}>
                                        Add A DISCOUNT CODE
                                    </Title>
                                    <Flex>
                                        <Input type={"email"} placeholder={`Enter your e-mail address`}
                                            className={`Shopping-bag__form-input`} />
                                        <Btn type={"submit"} primary className={`Shopping-bag__form-button`}>
                                            ADD
                                        </Btn>
                                    </Flex>
                                </label>

                                <label>
                                    <Title level={"h3"} className={`Shopping-bag__form-label__title`}>
                                        Log in to use your member offers.
                                    </Title>
                                    <Btn secondary className={`Shopping-bag__form-button--white`}>LOG IN</Btn>
                                </label>

                                <ul className={`list-none Shopping-bag__form-list`}>
                                    <li className={`Shopping-bag__form-list__item`}>
                                        <Flex justify={"space-between"}>
                                            <Title bodyText={"p"}>
                                                Order value
                                            </Title>
                                            <Title bodyText={"p"}>
                                                {cartTotal}$
                                            </Title>
                                        </Flex>
                                    </li>

                                    <li className={`Shopping-bag__form-list__item`}>
                                        <Flex justify={"space-between"}>
                                            <Title bodyText={"p"}>
                                                Shipping:
                                            </Title>
                                            <Title bodyText={"p"}>
                                                0.00$
                                            </Title>
                                        </Flex>
                                    </li>

                                    <li className={`Shopping-bag__form-list__item`}>
                                        <Flex justify={"space-between"}>
                                            <Title bodyText={"p"}>
                                                Total
                                            </Title>
                                            <Title bodyText={"p"}>
                                                82.00$
                                            </Title>
                                        </Flex>
                                    </li>
                                </ul>

                                <Btn type={"submit"} primary className={`Shopping-bag__form-button--primary`}>Continue to checkout</Btn>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>

            <AlsoBuy />
        </Fragment>
    )
}

export default Bag;