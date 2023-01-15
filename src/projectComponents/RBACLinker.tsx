import { ILinker, Linker } from '@sector-eleven-ltd/se-react-toolkit'
import { useContext } from 'react'
import { checkPages } from '../nav'
import { FirestoreContext } from './context'

interface IRbacLinker extends ILinker {}

export const RbacLinker = (props: IRbacLinker) => {
    const { pages } = useContext(FirestoreContext)

    return checkPages(pages || [], window.location.origin, props.href as string) ? (
        <Linker {...props}>{props.children}</Linker>
    ) : (
        <></>
    )
}
