import {JSX} from 'solid-js'

export interface IFirebaseProvider {
	children: JSX.Element
}

export const FirebaseProvider = (props: IFirebaseProvider) => {
	return props.children
}
