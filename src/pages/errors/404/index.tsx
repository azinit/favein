import React from 'react'
import Header from 'components/header';
import './index.scss'

type Props = {
    message?: string;
}

const Page404 = (props: Props) => {
    const { message = '' } = props;
    return (
        <div className="page page-404 bg-light d-flex flex-column">
            <Header />
            <div className="body d-flex align-items-center flex-grow-1">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3 col-12 error-main shadow bg-white">
                            <div className="row">
                                <div className="col-lg-8 col-12 col-sm-10 offset-lg-2 offset-sm-1">
                                    <h1 className="m-0">404</h1>
                                    <h6>Страница не найдена</h6>
                                    <p>{message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page404
