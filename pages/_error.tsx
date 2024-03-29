import { ErrorPage } from '@sector-eleven-ltd/se-react-toolkit'

export interface IError {
    statusCode: string
    message: string
}

const Error = ({ statusCode, message }: IError) => (
    <ErrorPage error={statusCode ? statusCode : message ? message : ''} />
)

Error.getInitialProps = ({ res, err }: any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    const message = res ? res.message : err ? err.message : 404
    return { statusCode, message }
}

export default Error
