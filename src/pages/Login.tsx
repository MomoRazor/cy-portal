import { Container, Typography } from '../components'

export interface ILogin {}

export const Login = (props: ILogin) => {
    return (
        <Container crossAxis="center" mainAxis="center" width="100vw" height="100vh">
            <Container elevated rounded padding="10px">
                <Typography>Login</Typography>
            </Container>
        </Container>
    )
}
