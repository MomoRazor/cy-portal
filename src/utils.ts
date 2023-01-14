import { NextRouter } from 'next/router'
import { User } from './restAPI'
import { EmptyFunctionHandler } from '@sector-eleven-ltd/se-react-toolkit'
import { getAuth } from 'firebase/auth'

export enum StorageTypes {
    history = 'History'
}

export const getHistory = () => {
    return localStorage.getItem(StorageTypes.history)
}

export const saveHistory = (history: string) => {
    localStorage.setItem(StorageTypes.history, history)
}

export const clearLocalData = () => {
    localStorage.clear()
}

export const parseUserOptions = (options: User[]) => {
    return options.map((user: User) => ({
        id: user._id || '',
        display: user.displayName
    }))
}

export const camLogout = async (router: NextRouter, logout: EmptyFunctionHandler) => {
    const firebaseAuth = getAuth()
    try {
        if (firebaseAuth.currentUser) {
            await firebaseAuth.signOut()
            logout()
            clearLocalData()
            router.push('/')
        } else {
            router.push('/')
        }
    } catch (e) {
        console.error(e)
    }
}
