import {
    AuthContext,
    Card,
    Colors,
    Container,
    Direction,
    FloatingIconButton,
    FloatingPosH,
    IconButton,
    Linker,
    Spacer,
    Table,
    TextVariants,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { ReactNode, useCallback, useContext, useState } from 'react'
import { BiShowAlt, BiEditAlt } from 'react-icons/bi'
import { CommunityOverlay } from '../projectComponents'
import { getCommunities, getGuideCommunities, ICommunity } from '../restAPI'
import { SidebarPage } from './SidebarPage'

interface CommunityRow extends ICommunity {
    actions: ReactNode
}

export interface IViewCommunities {
    guidingCommunity?: boolean
}

export const ViewCommunities = (props: IViewCommunities) => {
    const auth = useContext(AuthContext)

    const [showAddNew, setShowNew] = useState(false)
    const [editCommunity, setEditCommunity] = useState<ICommunity>()
    const [dirty, setDirty] = useState(false)

    const parseData = (args: { data: ICommunity[] }) => {
        let array: CommunityRow[] = []

        args.data.map((data) => {
            return array.push({
                ...data,
                actions: actionsRow(data)
            })
        })
        return array
    }

    const actionsRow = useCallback(
        (data: ICommunity) => (
            <Container direction={Direction.row} padding="0">
                <Linker href={`/communities/${data._id}/`} hocLink>
                    <IconButton>
                        <BiShowAlt />
                    </IconButton>
                </Linker>
                <IconButton
                    onClick={() => {
                        setEditCommunity(data)
                        setShowNew(true)
                    }}
                >
                    <BiEditAlt />
                </IconButton>
            </Container>
        ),
        []
    )

    const handleDiscard = () => {
        setShowNew(false)
        setEditCommunity(undefined)
    }

    const saveDrawer = () => {
        setEditCommunity(undefined)
        setShowNew(false)
        setDirty(true)
    }

    return (
        <>
            <SidebarPage>
                <Container width="100%">
                    <Typography variant={TextVariants.h4} color={Colors.title}>
                        {props.guidingCommunity ? 'Guiding Communities' : 'Communities'}
                    </Typography>
                    <Spacer height="20px" />

                    <Card>
                        <Table
                            dirty={dirty}
                            setDirty={setDirty}
                            apiCall={
                                props.guidingCommunity
                                    ? () => getGuideCommunities(auth.user._id)
                                    : getCommunities
                            }
                            parseRows={parseData}
                            headers={[
                                { id: 'name', title: 'Name' },
                                { id: 'actions', title: 'Actions' }
                            ]}
                            keyName="id"
                            pagination={false}
                        />
                    </Card>
                </Container>
            </SidebarPage>
            <FloatingIconButton
                horizontalPos={FloatingPosH.right}
                right="40px"
                bottom="30px"
                width="auto"
                onClick={() => {
                    setShowNew(true)
                }}
                zIndex={5}
            >
                <Typography color={Colors.textOnPrimary}>Add Community</Typography>
            </FloatingIconButton>
            <CommunityOverlay
                onClose={handleDiscard}
                onSave={saveDrawer}
                show={showAddNew}
                data={editCommunity}
            />
        </>
    )
}
