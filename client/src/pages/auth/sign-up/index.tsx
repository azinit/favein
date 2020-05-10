import React, { ChangeEvent, FormEvent } from 'react'
import Header from 'components/header'
import { useSelector, useDispatch } from 'react-redux'
import TextField from 'components/text-field'
import { updateAuthPayload } from 'store/auth/slice'
import { Button } from 'react-bootstrap'
import { signIn } from 'store/auth/service'
import './index.scss'

const SignUpPage = () => {
    const dispatch = useDispatch()
    const { email = "", password = "" } = useSelector((state: IGlobalState) => state.auth.authPayload)
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
                            value={""}
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
