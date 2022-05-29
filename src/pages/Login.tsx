import { Container, TextField, Typography } from '../components'

export interface ILogin {}

export const Login = (props: ILogin) => {
    return (
        <Container crossAxis="center" mainAxis="center" width="100vw" height="100vh">
            <Container
                elevated
                rounded
                padding="10px"
                crossAxis="center"
                width="400px"
                height="600px"
            >
                <Typography variant="h2" textAlign="center">
                    Login
                </Typography>
            </Container>

            <TextField value="test" setValue={(test) => console.log(test)} />
        </Container>
    )
}
