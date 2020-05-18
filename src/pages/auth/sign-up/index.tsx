import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import Header from 'components/header'
import { useSelector, useDispatch } from 'react-redux'
import TextField from 'components/text-field'
import { updateAuthPayload, resetAuthPayload } from 'store/auth/slice'
import { Button } from 'react-bootstrap'
import { signUp } from 'store/auth/service'
import './index.scss'

const SignUpPage = () => {
    const dispatch = useDispatch()
    const { email = "", password = "", username = "" } = useSelector((state: IGlobalState) => state.auth.authPayload)

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
        dispatch(signUp())
    }

    return (
        <div className="page page-auth page-signup bg-light">
            <Header />
            <div className="body">
                <div className="container bg-white shadow-sm">
                    <h3 className='text-center mb-4'>Создание нового аккаунта</h3>
                    <form onSubmit={onSubmit}>
                        <TextField
                            label="Username"
                            name="username"
                            placeholder="user213132"
                            value={username}
                            onChange={onChange}
                        />
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
                            Создать
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
