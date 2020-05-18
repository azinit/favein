import React from 'react'
import { Carousel } from 'react-bootstrap'
import ScreenUser from 'assets/userpage.png'

type Props = {
    img: string;
    label: string;
    description: string;
}
const HomeScreen = (props: Props) => {
    const { description, img, label } = props
    return (
        <>
            <img
                className="d-block w-100 carousel-img"
                src={img}
                alt={label}
            />
            <Carousel.Caption>
                <h3>{label}</h3>
                <p>{description}</p>
            </Carousel.Caption>
        </>
    )
}

export default HomeScreen
