import { defaultStorageSetup, IConfig, reducerCombiner } from '@sector-eleven-ltd/se-react-toolkit'
import { Reducer } from 'react'
import { createStore, combineReducers } from 'redux'
import { persistStore } from 'redux-persist'
import { User } from './restAPI'

const appName = 'cy-portal'

const allReducer = combineReducers<Reducer<IConfig<User>, any>>(
    reducerCombiner(appName, {
        ...defaultStorageSetup
    })
)

export const store = createStore(allReducer)

export const persistor = persistStore(store)
