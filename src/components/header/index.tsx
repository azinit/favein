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
            <Navbar.Brand href="/home">FaveIn</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {isAuth && current?.admin && <Nav.Link href="/admin" className='text-warning'>Admin</Nav.Link>}
                    {isAuth && <Nav.Link href="/users">Пользователи</Nav.Link>}
                    {isAuth && <Nav.Link href="/labels">Метки</Nav.Link>}
                    {isAuth && <Nav.Link href="/faves">Избранное</Nav.Link>}
                    {isAuth && <Nav.Link href="/user-cards">Материалы</Nav.Link>}
                    {isAuth && <Nav.Link href="/cards/9" className='text-secondary' disabled>[Card Example]</Nav.Link>}
                    {isAuth && <Nav.Link href="/dashboards/3" className='text-secondary' disabled>[Dashboard Example]</Nav.Link>}
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
                                className="auth-btn ml-2"
                            >
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/auth/sign-in" className="auth-btn sign-in btn btn-info">
                                Войти
                            </Link>
                            <Link to="/auth/sign-up" className="auth-btn sign-up btn btn-outline-secondary ml-2">
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
