import { keyframes, styled } from 'solid-styled-components'

export interface IQuadSpinner {
    color?: string
    margin?: string
    size?: string
    width?: string
    height?: string
}

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

const Spinner = styled('div')((props: IQuadSpinner) => ({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: props.margin || 'auto',
    width: props.size || '17px',
    height: props.size || '17px',
    border: '4px solid transparent',
    borderTopColor: 'black',
    borderRadius: '50%',
    animation: `${rotate} 1s ease infinite`
}))

export const QuadSpinner = (props: IQuadSpinner) => (
    <Spinner
        color={props.color}
        margin={props.margin}
        size={props.size}
        width={props.width}
        height={props.height}
    />
)
