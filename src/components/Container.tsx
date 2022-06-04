import { styled } from 'solid-styled-components'
import { createSignal, JSX } from 'solid-js'
import { generateNeumorphismCss, Impression } from '../utils'
import { baseColor, lightSource } from '../style'

export interface IContainer {
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
    crossAxis?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
    mainAxis?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
    width?: string
    height?: string
    children: JSX.Element
    impression?: Impression
    rounded?: boolean
    padding?: string
}

export const Container = (props: IContainer) => {
    let ref: HTMLDivElement | undefined

    const [width, setWidth] = createSignal(0)
    const [height, setHeight] = createSignal(0)

    setTimeout(() => {
        setWidth(ref?.clientWidth || 0)
        setHeight(ref?.clientHeight || 0)
    }, 100)

    const StyledDiv = styled.div(() => {
        const neuMorphic = generateNeumorphismCss(
            width(),
            height(),
            baseColor,
            props.impression || 'elevated',
            lightSource
        )

        return {
            display: 'flex',
            justifyContent: props.crossAxis,
            alignItems: props.mainAxis,
            flexDirection: props.direction || 'column',
            width: props.width,
            height: props.height,
            borderRadius: props.rounded ? '50px' : undefined,
            padding: props.padding,
            ...neuMorphic
        }
    })

    return <StyledDiv ref={ref}>{props.children}</StyledDiv>
}
