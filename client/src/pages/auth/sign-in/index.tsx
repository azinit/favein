import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import Header from 'components/header'
import { useSelector, useDispatch } from 'react-redux'
import TextField from 'components/text-field'
import { updateAuthPayload, resetAuthPayload } from 'store/auth/slice'
import { Button, Alert } from 'react-bootstrap'
import { signIn } from 'store/auth/service'
import './index.scss'

const SignInPage = () => {
    const dispatch = useDispatch()
    const { email = "", password = "", errors = [] } = useSelector((state: IGlobalState) => state.auth.authPayload)

    useEffect(() => {
        dispatch(resetAuthPayload())
    }, [])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log('[DEBUG] ::', name, value)
        dispatch(updateAuthPayload({ [name]: value }))
    }
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(signIn())
    }

    return (
        <div className="page page-auth page-signin bg-light">
            <Header />
            <div className="body">
                <div className="container bg-white shadow-sm">
                    <h3 className='text-center mb-4'>Вход в FaveIn</h3>
                    {errors.map(e => (
                        <Alert variant="danger">{e}</Alert>
                    ))}
                    <form onSubmit={onSubmit}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={onChange}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="*******"
                            value={password}
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            variant="info"
                            block
                        >
                            Войти
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInPage
