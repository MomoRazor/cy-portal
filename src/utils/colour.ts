export const RGBToHex = (r: number, g: number, b: number) => {
    let rString = r.toString(16)
    let gString = g.toString(16)
    let bString = b.toString(16)

    if (rString.length == 1) rString = '0' + rString
    if (gString.length == 1) gString = '0' + gString
    if (bString.length == 1) bString = '0' + bString

    return '#' + rString + gString + bString
}

export const hexToRGB = (h: string) => {
    let r = '0',
        g = '0',
        b = '0'

    // 3 digits
    if (h.length == 4) {
        r = '0x' + h[1] + h[1]
        g = '0x' + h[2] + h[2]
        b = '0x' + h[3] + h[3]

        // 6 digits
    } else if (h.length == 7) {
        r = '0x' + h[1] + h[2]
        g = '0x' + h[3] + h[4]
        b = '0x' + h[5] + h[6]
    }

    const rInt = parseInt(r, 16)
    const gInt = parseInt(g, 16)
    const bInt = parseInt(b, 16)

    return {
        r: rInt,
        g: gInt,
        b: bInt
    }
}

export const RGBAToHSLA = (r: number, g: number, b: number, a?: number) => {
    const divR = (r /= 255)
    const divG = (g /= 255)
    const divB = (b /= 255)

    const cmin = Math.min(divR, divG, divB)
    const cmax = Math.max(divR, divG, divB)

    const delta = cmax - cmin

    let h = 0

    if (delta == 0) {
        h = 0
    } else if (cmax == divR) {
        h = ((divG - divB) / delta) % 6
    } else if (cmax == divG) {
        h = (divB - divR) / delta + 2
    } else {
        h = (divR - divG) / delta + 4
    }

    h = Math.round(h * 60)

    // Make negative hues positive behind 360°
    if (h < 0) {
        h += 360
    }

    let l = (cmax + cmin) / 2

    // Calculate saturation
    let s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    // Multiply l and s by 100
    s = parseFloat((s * 100).toFixed(1))
    l = parseFloat((l * 100).toFixed(1))

    return {
        h,
        s,
        l,
        a
    }
}

export const HSLAToRGBA = (h: number, s: number, l: number, a?: number) => {
    // Must be fractions of 1
    let divS = (s /= 100)
    let divL = (l /= 100)

    const c = (1 - Math.abs(2 * divL - 1)) * divS

    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))

    const m = divL - c / 2

    let r = 0
    let g = 0
    let b = 0

    if (0 <= h && h < 60) {
        r = c
        g = x
        b = 0
    } else if (60 <= h && h < 120) {
        r = x
        g = c
        b = 0
    } else if (120 <= h && h < 180) {
        r = 0
        g = c
        b = x
    } else if (180 <= h && h < 240) {
        r = 0
        g = x
        b = c
    } else if (240 <= h && h < 300) {
        r = x
        g = 0
        b = c
    } else if (300 <= h && h < 360) {
        r = c
        g = 0
        b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return {
        r,
        g,
        b,
        a
    }
}

export const hexToHSLA = (h: string) => {
    const rgb = hexToRGB(h)

    return RGBAToHSLA(rgb.r, rgb.g, rgb.b)
}

export const shadeColor = (col: string, percent: number) => {
    let usePound = false

    if (col[0] == '#') {
        col = col.slice(1)
        usePound = true
    }

    let R = parseInt(col.substring(0, 2), 16)
    let G = parseInt(col.substring(2, 4), 16)
    let B = parseInt(col.substring(4, 6), 16)

    // to make the colour less bright than the input
    // change the following three "+" symbols to "-"
    R = R + percent
    G = G + percent
    B = B + percent

    if (R > 255) R = 255
    else if (R < 0) R = 0

    if (G > 255) G = 255
    else if (G < 0) G = 0

    if (B > 255) B = 255
    else if (B < 0) B = 0

    const RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16)
    const GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16)
    const BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16)

    return (usePound ? '#' : '') + RR + GG + BB
}
