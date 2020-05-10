import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import './index.scss'
import { logout } from 'store/auth/slice'

const Header = () => {
    const { isAuth, current } = useSelector((state: IGlobalState) => state.auth)
    const dispatch = useDispatch();
    return (
        <Navbar
            className='header'
            expand="lg"
            variant="dark"
        >
            <Navbar.Brand href="/home">Favein</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {isAuth && <Nav.Link href="/admin">Admin</Nav.Link>}
                    {isAuth && <Nav.Link href="/users">Users</Nav.Link>}
                    {isAuth && <Nav.Link href="/labels">Labels</Nav.Link>}
                    {isAuth && <Nav.Link href="/cards/9">Card Example</Nav.Link>}
                    {isAuth && <Nav.Link href="/dashboards/3">Dashboard Example</Nav.Link>}
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                {isAuth ?
                    (
                        <>
                            <a
                                href={`/users/${current!.id}`}
                                className='btn btn-outline-secondary'
                            >
                                {current!.username}
                            </a>
                            <Button
                                variant="secondary"
                                onClick={() => dispatch(logout())}
                                className="ml-2"
                            >
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/auth/sign-in" className="btn btn-info">
                                Войти
                            </Link>
                            <Link to="/auth/sign-up" className="btn btn-outline-secondary ml-2">
                                Создать аккаунт
                            </Link>
                        </>
                    )
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
