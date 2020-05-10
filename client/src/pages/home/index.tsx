import React from 'react'
import Header from 'components/header'
import './index.scss'
import { Jumbotron, Carousel } from 'react-bootstrap'

const HomePage = () => {
    return (
        <div className="page page-home">
            <Header />
            {/* <Jumbotron className="m-0 darken rounded-0">
                ...
            </Jumbotron>
            <Jumbotron className="m-0 bg-white rounded-0">
                ...
            </Jumbotron>
            <Jumbotron className="m-0">
                ...
            </Jumbotron>
            <Jumbotron className="m-0 bg-white rounded-0">
                ...
            </Jumbotron> */}
            <div className="body">
                {/* FIXME: slides as actions with funtional */}
                <Carousel interval={3000}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-img"
                            src="https://images.unsplash.com/photo-1528413538163-0e0d91129480?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-img"
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-img"
                            src="https://images.unsplash.com/photo-1485796826113-174aa68fd81b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}

export default HomePage
