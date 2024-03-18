import { Fragment, useEffect, useContext, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/container";
import { Button, Checkbox, Flex, Typography } from "antd";
import Title from "../components/Title";
import { FiFilter } from "react-icons/fi";
import Cart from "../components/Cart";
import Product1 from "../images/product1.png";
import { default as Btn } from "../components/Button";
import { Context } from "../Context";

const Catalog = () => {
    const { Data } = useContext(Context);

    const [DataProducts, setDataProducts] = useState([]);
    const [SliceDataProducts, setSliceDataProducts] = useState(6);
    const [Hidden, setHidden] = useState(false);

    const handleFilter = () => setHidden(prev => !prev)

    const handleLoad = () => {
        if (SliceDataProducts > (DataProducts.length - 1)) {
            setSliceDataProducts(6)
        } else {
            setSliceDataProducts(prev => prev + 6)
        }
    }

    const handleProducts = () => {
        setDataProducts(() => Data && Data?.length ? Data : []);
    }

    const handleRoom = (e) => {
        const value = e.target.dataset.byRoom?.toLowerCase();

        const data = Data?.filter(product => product?.category?.room?.toLowerCase() === value)

        setDataProducts([...data])

    }

    const handleConcept = e => {
        const value = e.target.dataset.byConcept?.toLowerCase();

        const data = Data?.filter(product => (
            product?.category?.quality?.toLowerCase() === value
        ))

        setDataProducts([...data])
    }

    const handleGender = e => {
        const value = e.target.value.toLowerCase();

        if (e.target.checked) {
            const data = Data?.filter(product => (
                product?.category?.gender?.toLowerCase() === value
            ))

            setDataProducts([...data])
        } else {
            setDataProducts([...Data])
        }
    }

    const handlePrice = e => {
        const priceMin = Number(e.target["data-price-min"]);
        const priceMax = Number(e.target["data-price-max"]);

        if (e?.target?.checked) {

            const data = Data?.filter(product => (
                product.price >= priceMin &&
                product.price <= priceMax
            ));

            setDataProducts([...data]);

        } else {
            setDataProducts([...Data])
        }
    }

    useEffect(() => {
        setDataProducts([...Data]);

    }, [Data?.length]);

    const product = DataProducts?.slice(0, SliceDataProducts)
        .map(product => {
            return (
                <Fragment key={product.id}>
                    <Cart
                        href={`/catalog/product/${product.id}`}
                        type={"product"}
                        vertical
                        image={product.image}
                        title={product.title}
                        colors={product.colors}
                        price={product.price}
                        savedproduct={product}
                    />
                </Fragment>
            )
        })

    return (
        <Fragment>
            <Breadcrumb />
            <section className="Sales">
                <Container>
                    <div className="Sales__row">
                        <Typography.Title level={1} className={`Sales__title`}>
                            MEMBER EXCLUSIVE
                        </Typography.Title>
                        <Typography.Title level={1} className={`Sales__text`}>
                            15% OFF EVERYTHING + EXTRA $10 OFF FOR PLUS STATUS
                        </Typography.Title>
                        <Title bodyText={'p'} className={`Sales__recommended`}>
                            NOT A MEMBER? JOIN NOW TO SHOP.
                        </Title>
                    </div>
                </Container>
            </section>

            <section className="Products">
                <Container>
                    <Flex justify={"space-between"} gap={130}>
                        {/*Products__aside show*/}
                        <aside className={`Products__aside ${Hidden && "show"}`}>
                            <div className="Products__aside-item">
                                <Typography.Title level={4} className={`Products__aside-title`}>New
                                    arrivals</Typography.Title>
                                <ul className={`list-none`}>
                                    <li>
                                        <Title bodyText={'p'} className={`Products__aside-text`}>New
                                            arrivals</Title>
                                    </li>
                                </ul>
                            </div>

                            <div className="Products__aside-item">
                                <Typography.Title className="Products__aside-title" level={4}>Shop by room</Typography.Title>

                                <ul className={`list-none Products__aside-list`}>
                                    <li className={"active"}>
                                        <Title data-by-room={"Bedroom"} onClick={handleRoom} bodyText={'p'} className={`Products__aside-text`}>Bedroom</Title>
                                    </li>

                                    <li>
                                        <Title data-by-room={"Living Room"} onClick={handleRoom} bodyText={'p'} className={`Products__aside-text`}>living room</Title>
                                    </li>

                                    <li>
                                        <Title data-by-room={"Child Room"} onClick={handleRoom} bodyText={'p'} className={`Products__aside-text`}>child room</Title>
                                    </li>

                                    <li>
                                        <Title data-by-room={"Bathroom"} onClick={handleRoom} bodyText={'p'} className={`Products__aside-text`}>bathroom</Title>
                                    </li>

                                    <li>
                                        <Title data-by-room={"Other"} onClick={handleRoom} bodyText={'p'} className={`Products__aside-text`}>Outdoor</Title>
                                    </li>
                                </ul>
                            </div>

                            <div className="Products__aside-item">
                                <Typography.Title className="Products__aside-title" level={4}>shop by
                                    concept</Typography.Title>
                                <ul className={`list-none Products__aside-list`}>

                                    <li>
                                        <Title onClick={handleConcept} data-by-concept={"Conscious"} bodyText={'p'} className={`Products__aside-text`}>Conscious</Title>
                                    </li>

                                    <li>
                                        <Title onClick={handleConcept} data-by-concept={"premium quality"} bodyText={'p'} className={`Products__aside-text`}>premium
                                            quality</Title>
                                    </li>

                                    <li>
                                        <Title onClick={handleConcept} data-by-concept={"classic collection"} bodyText={'p'} className={`Products__aside-text`}>classic
                                            collection</Title>
                                    </li>
                                </ul>
                            </div>

                            <div className="Products__aside-item">
                                <Typography.Title className="Products__aside-title"
                                    level={4}>gender</Typography.Title>

                                <Checkbox.Group>
                                    <ul className={`list-none Products__aside-list`}>

                                        <li>
                                            <Checkbox value={"Man"} onChange={handleGender}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>Man</Title>
                                            </Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox value={"Woman"} onChange={handleGender}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>woman</Title>
                                            </Checkbox>
                                        </li>
                                    </ul>
                                </Checkbox.Group>
                            </div>

                            <div className="Products__aside-item">
                                <Typography.Title className="Products__aside-title" level={4}>Color</Typography.Title>
                                <Checkbox.Group>
                                    <Flex wrap={"wrap"} gap={13} className="Products__aside-checkboxes">

                                        <Checkbox value={"white"} className={`Products__aside-checkbox Products__aside-checkbox--white`} />
                                        <Checkbox value={"black"} className={`Products__aside-checkbox Products__aside-checkbox--black`} />
                                        <Checkbox value={"grey"} className={`Products__aside-checkbox Products__aside-checkbox--grey`} />
                                        <Checkbox value={"yellow"} className={`Products__aside-checkbox Products__aside-checkbox--yellow`} />
                                        <Checkbox value={"orange"} className={`Products__aside-checkbox Products__aside-checkbox--orange`} />
                                        <Checkbox value={"orange-red"} className={`Products__aside-checkbox Products__aside-checkbox--orange-red`} />
                                        <Checkbox value={"pink"} className={`Products__aside-checkbox Products__aside-checkbox--pink`} />
                                        <Checkbox value={"aqua"} className={`Products__aside-checkbox Products__aside-checkbox--aqua`} />
                                        <Checkbox value={"green"} className={`Products__aside-checkbox Products__aside-checkbox--green`} />
                                        <Checkbox value={"green-secondary"} className={`Products__aside-checkbox Products__aside-checkbox--green-secondary`} />
                                        <Checkbox value={"blue"} className={`Products__aside-checkbox Products__aside-checkbox--blue`} />
                                        <Checkbox value={"red"} className={`Products__aside-checkbox Products__aside-checkbox--red`} />
                                        <Checkbox value={"brown"} className={`Products__aside-checkbox Products__aside-checkbox--brown`} />
                                        <Checkbox value={"darkblue"} className={`Products__aside-checkbox Products__aside-checkbox--darkblue`} />
                                        <Checkbox value={"lightbrown"} className={`Products__aside-checkbox Products__aside-checkbox--lightbrown`} />
                                        <Checkbox value={"violet"} className={`Products__aside-checkbox Products__aside-checkbox--violet`} />
                                        <Checkbox value={"darkgreen"} className={`Products__aside-checkbox Products__aside-checkbox--darkgreen`} />
                                        <Checkbox value={"march"} className={`Products__aside-checkbox Products__aside-checkbox--march`} />
                                    </Flex>
                                </Checkbox.Group>
                            </div>

                            <div className="Products__aside-item">
                                <Typography.Title className="Products__aside-title" level={4}>Price</Typography.Title>

                                <Checkbox.Group>
                                    <ul className={`list-none Products__aside-list`}>

                                        <li>
                                            <Checkbox onChange={handlePrice} data-price-min={0} data-price-max={40} value={"40"}>
                                                <Title bodyText={'p'}
                                                    className={`Products__aside-text`}>0$-40$</Title>
                                            </Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox data-price-min={40} data-price-max={100} value={"100"}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>40$ –
                                                    100$</Title>
                                            </Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox data-price-min={100} data-price-max={150} name={"150"}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>100$ –
                                                    150$</Title>
                                            </Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox data-price-min={150} data-price-max={175} value={"175"}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>150$ –
                                                    175$</Title>
                                            </Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox data-price-min={175} data-price-max={250} name={"250"}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>175$ –
                                                    250$</Title>
                                            </Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox data-price-min={250} data-price-max={350} value={"350"}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>250$ –
                                                    350$</Title>
                                            </Checkbox>
                                        </li>
                                    </ul>
                                </Checkbox.Group>
                            </div>
                        </aside>

                        {/*Products__wrap active*/}
                        <article className={`Products__wrap ${Hidden && "active"}`}>
                            <Title level={"h1"} className={`Products__title`}>BEDROOM</Title>
                            <Title level={"h3"} className={`Products__subtitle`}>ITS EASY TO TRANSFORM YOUR BEDROOM INTERIOR WITH OUR GREAT SELECTION OF ACCESSORIES.</Title>

                            <Flex align={"center"} justify={"space-between"} className="Products__filters">
                                <Button icon={<FiFilter />} onClick={handleFilter}>
                                    filter & sort
                                </Button>

                                <div className="Products__filters-right">
                                    <Btn className={`Products__filters-red`} secondary>
                                        <Title bodyText={"p"}>Models</Title>
                                    </Btn>
                                    <Btn secondary onClick={handleProducts}>
                                        <Title bodyText={"p"}>products</Title>
                                    </Btn>

                                </div>
                            </Flex>

                            <Flex gap={24} wrap={"wrap"}>
                                {product}
                            </Flex>

                            <div className="Products__buttons">
                                <Btn primary onClick={handleLoad}>load more products</Btn>
                            </div>

                        </article>
                    </Flex>
                </Container>
            </section>
        </Fragment>
    )
}

export default Catalog;