export const RGBToHex = (r: number, g: number, b: number) => {
    let rString = r.toString(16)
    let gString = g.toString(16)
    let bString = b.toString(16)

    if (rString.length == 1) rString = '0' + rString
    if (gString.length == 1) gString = '0' + gString
    if (bString.length == 1) bString = '0' + bString

    console.log('#' + rString + gString + bString)

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

    console.log({
        r: rInt,
        g: gInt,
        b: bInt
    })

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
