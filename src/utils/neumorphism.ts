import { shadeColor } from './colour'

export type LightSource = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type Impression = 'elevated' | 'pressed' | 'concave' | 'convex'

export const generateNeumorphismCss = (
    width: number,
    height: number,
    colorHex: string,
    impression: Impression,
    lightSource: LightSource = 'top-left'
) => {
    let boxShadowLine1Dim1, boxShadowLine1Dim2, boxShadowLine2Dim1, boxShadowLine2Dim2

    const boxShadowLine1Dim3 = `${Math.floor(width / 10)}px`
    const boxShadowLine2Dim3 = `${Math.floor(width / 10)}px`
    const boxShadowLine1Colour = shadeColor(colorHex, -20)
    const boxShadowLine2Colour = shadeColor(colorHex, 20)

    if (lightSource === 'top-left' || lightSource === 'bottom-left') {
        boxShadowLine1Dim1 = `${Math.floor(width / 15)}px`
        boxShadowLine2Dim1 = `-${Math.floor(width / 15)}px`
    } else if (lightSource === 'top-right' || lightSource === 'bottom-right') {
        boxShadowLine1Dim1 = `-${Math.floor(width / 15)}px`
        boxShadowLine2Dim1 = `${Math.floor(width / 15)}px`
    }

    if (lightSource === 'top-left' || lightSource === 'top-right') {
        boxShadowLine1Dim2 = `${Math.floor(height / 15)}px`
        boxShadowLine2Dim2 = `-${Math.floor(height / 15)}px`
    } else if (lightSource === 'bottom-left' || lightSource === 'bottom-right') {
        boxShadowLine1Dim2 = `-${Math.floor(height / 15)}px`
        boxShadowLine2Dim2 = `${Math.floor(height / 15)}px`
    }

    const boxShadow = `${
        impression === 'pressed' ? 'inset' : ''
    } ${boxShadowLine1Dim1} ${boxShadowLine1Dim2} ${boxShadowLine1Dim3} ${boxShadowLine1Colour}, ${
        impression === 'pressed' ? 'inset' : ''
    } ${boxShadowLine2Dim1} ${boxShadowLine2Dim2} ${boxShadowLine2Dim3} ${boxShadowLine2Colour}`

    const background = `${impression === 'concave' || impression === 'convex' ? `` : colorHex}`

    return {
        boxShadow,
        background
    }
}
