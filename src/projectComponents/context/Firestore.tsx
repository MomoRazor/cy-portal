import { doc, onSnapshot, Unsubscribe } from '@firebase/firestore'
import getConfig from 'next/config'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { FirebaseContext } from './Firebase'

interface IFirestoreContext {
    pages?: string[]
    permissions?: string[]
}

export interface IAccess {
    portals?: {
        [domain: string]: string[]
    }
    permissions?: {
        [method: string]: string[]
    }
}

export const FirestoreContext = createContext<IFirestoreContext>({})

interface IFirestoreProvider {
    children: ReactNode
}

export const FirestoreProvider = (props: IFirestoreProvider) => {
    const { publicRuntimeConfig } = getConfig()
    const { db, status, user } = useContext(FirebaseContext)
    const [pages, setPages] = useState<string[]>()
    const [permissions, setPermissions] = useState<string[]>()
    const [loading, setLoading] = useState(true)

    const parsePages = useCallback(
        (access?: IAccess) => {
            const portals = access?.portals

            let pages: string[] = []

            if (!portals) {
                setPages([])
                return
            }

            const domainKeys = Object.keys(portals)

            for (let i = 0; i < domainKeys.length; i++) {
                if (publicRuntimeConfig.local) {
                    pages = pages.concat(
                        portals[domainKeys[i]].map(
                            (endpoint) => `http://localhost:3000:${endpoint}`
                        )
                    )
                } else {
                    pages = pages.concat(
                        portals[domainKeys[i]].map((endpoint) => `${domainKeys[i]}:${endpoint}`)
                    )
                }
            }
            setPages(pages)
        },
        [publicRuntimeConfig.local]
    )

    const parsePermissions = (access?: IAccess) => {
        const permissionList = access?.permissions

        let permissions: string[] = []

        if (!permissionList) {
            setPermissions([])
            return
        }

        const methodKeys = Object.keys(permissionList)

        for (let i = 0; i < methodKeys.length; i++) {
            permissions = permissions.concat(
                permissionList[methodKeys[i]].map((endpoint) => `${methodKeys[i]}:${endpoint}`)
            )
        }

        setPermissions(permissions)
    }

    const setPagePermissionsSubscription = useCallback(() => {
        try {
            if (db) {
                return onSnapshot(doc(db, 'access', user?.uid || ''), (doc) => {
                    let data = doc.data() as IAccess | undefined

                    parsePages(data)
                    parsePermissions(data)
                    setLoading(false)
                })
            } else {
                return
            }
        } catch (e) {
            console.error(e)
            return
        }
    }, [db, parsePages, user?.uid])

    useEffect(() => {
        let permissionsSub: Unsubscribe | undefined
        if (status === 'LOGGED_IN' && user) {
            permissionsSub = setPagePermissionsSubscription()
            return () => {
                permissionsSub && permissionsSub()
            }
        } else {
            setPages([])
            setPermissions([])
            setLoading(true)
            return
        }
    }, [setPagePermissionsSubscription, status, user])

    return (
        <FirestoreContext.Provider
            value={{
                pages,
                permissions
            }}
        >
            {!loading || status !== 'LOGGED_IN' ? props.children : <></>}
        </FirestoreContext.Provider>
    )
}
