import React from 'react'
import Header from 'components/header'
import './index.scss'
import { Jumbotron, Carousel } from 'react-bootstrap'
import Screen from './screen'
import { screens } from './fixtures'

const HomePage = () => {
    return (
        <div className="page page-home">
            <Header />
            <div className="body">
                <div className="body-overlay" />
                <Carousel interval={300000}>
                    {screens.map((props) => (
                        <Carousel.Item>
                            <Screen {...props}/>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default HomePage
