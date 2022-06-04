import { createSignal } from 'solid-js'
import { Container, TextField, Typography } from '../components'

export interface ILogin {}

export const Login = (props: ILogin) => {
    const [email, setEmail] = createSignal('')

    return (
        <Container crossAxis="center" mainAxis="center" width="100vw" height="100vh">
            <Container rounded padding="10px" crossAxis="center" width="400px" height="600px">
                <Typography variant="h2" textAlign="center">
                    Login
                </Typography>
                <TextField value={email()} setValue={setEmail} />
            </Container>
        </Container>
    )
}
