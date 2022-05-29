import { styled } from 'solid-styled-components'
import { JSX } from 'solid-js'
import { hexToHSL } from '../utils'

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
    backgroundColor?: string
    children: JSX.Element
    elevated?: boolean
    depressed?: boolean
    rounded?: boolean
    padding?: string
}

export const Container = (props: IContainer) => {
    let ref: HTMLDivElement | undefined

    const generateElevatedShadow = (width: number, colorHex: string) => {
        const hsl = hexToHSL(colorHex)

        return `${Math.floor(width / 10)}px ${Math.floor(width / 10)}px ${Math.floor(
            (width * 2) / 10
        )}px ${colorHex} -${Math.floor(width / 10)}px -${Math.floor(width / 10)}px ${Math.floor(
            (width * 2) / 10
        )}px hsl(${hsl.h},${hsl.s + 10}, ${hsl.l}`
    }

    const generatedDepressedShadow = (width: number, colorHex: string) => {
        const hsl = hexToHSL(colorHex)

        return `inset ${Math.floor(width / 10)}px ${Math.floor(width / 10)}px ${Math.floor(
            (width * 2) / 10
        )}px ${colorHex} inset -${Math.floor(width / 10)}px -${Math.floor(
            width / 10
        )}px ${Math.floor((width * 2) / 10)}px hsl(${hsl.h},${hsl.s + 10}, ${hsl.l}`
    }

    const StyledDiv = styled.div(() => ({
        display: 'flex',
        justifyContent: props.crossAxis,
        alignItems: props.mainAxis,
        flexDirection: props.direction || 'column',
        width: props.width,
        height: props.height,
        backgroundColor: props.backgroundColor,
        boxShadow: props.elevated
            ? generateElevatedShadow(ref?.getBoundingClientRect().width || 0, '#ffff')
            : props.depressed
            ? generatedDepressedShadow(ref?.getBoundingClientRect().width || 0, '#ffff')
            : undefined,
        borderRadius: props.rounded ? '50px' : undefined,
        padding: props.padding
    }))

    return <StyledDiv ref={ref}>{props.children}</StyledDiv>
}
