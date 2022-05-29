import { JSX } from 'solid-js'
import { styled } from 'solid-styled-components'

export interface ITypography {
    variant?:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'small'
        | 'span'
        | 'p'
        | 'b'
        | 'strong'
        | 'i'
        | 'em'
        | 'mark'
        | 'del'
        | 'ins'
        | 'sub'
        | 'sup'
    textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent'
    children: JSX.Element
}

export const Typography = (props: ITypography) => {
    const StyledText = styled(props.variant || 'span')(() => ({
        textAlign: props.textAlign,
        fontFamily: 'Roboto'
    }))

    return <StyledText>{props.children}</StyledText>
}
