import { useRouter } from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { getHistory, saveHistory } from '../../utils'

export const HistoryContext = createContext<{ previous?: string }>({})

interface IHistoryProvider {
    children: ReactNode
}

export const HistoryProvider = (props: IHistoryProvider) => {
    const router = useRouter()

    const [previous, setPrevious] = useState<string>()

    useEffect(() => {
        if (getHistory() !== router.pathname) {
            setPrevious(getHistory() || undefined)
            saveHistory(router.pathname)
        }
    }, [router.pathname])

    return (
        <HistoryContext.Provider
            value={{
                previous
            }}
        >
            {props.children}
        </HistoryContext.Provider>
    )
}
