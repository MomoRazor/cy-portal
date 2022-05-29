export const hexToHSL = (hexColor: string) => {
    console.log(hexColor)
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)

    if (result) {
        const r = parseInt(result[1], 16)
        const g = parseInt(result[2], 16)
        const b = parseInt(result[3], 16)

        let dividedR = r / 255
        let dividedG = g / 255
        let dividedB = b / 255

        const max = Math.max(dividedR, dividedG, dividedB)
        const min = Math.min(dividedR, dividedG, dividedB)

        let h, s
        const l = (max + min) / 2
        if (max == min) {
            h = 0 // achromatic
            s = 0
        } else {
            const d = max - min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0)
                    break
                case g:
                    h = (b - r) / d + 2
                    break
                case b:
                    h = (r - g) / d + 4
                    break
            }
            if (h) {
                h = h / 6
            }
        }

        return {
            h,
            s,
            l
        }
    } else {
        throw 'Error getting Hex'
    }
}
