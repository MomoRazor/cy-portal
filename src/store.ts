import { IConfig, reducerCombiner } from '@sector-eleven-ltd/se-react-toolkit'
import { Reducer } from 'react'
import { createStore, combineReducers } from 'redux'
import { persistStore } from 'redux-persist'

const appName = 'cy-portal'

const allReducer = combineReducers<Reducer<IConfig, any>>(reducerCombiner(appName))

export const store = createStore(allReducer)

export const persistor = persistStore(store)
