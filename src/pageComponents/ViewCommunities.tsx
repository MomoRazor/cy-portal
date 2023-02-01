import {
    AuthContext,
    Card,
    Colors,
    Container,
    Direction,
    FloatingIconButton,
    FloatingPosH,
    IconButton,
    Spacer,
    Table,
    TextVariants,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { ReactNode, useCallback, useContext, useState } from 'react'
import { BiShowAlt, BiEditAlt } from 'react-icons/bi'
import { CommunityOverlay, RbacLinker } from '../projectComponents'
import { SidebarPage } from './SidebarPage'
import { Community, getCommunityTable } from '../restAPI'

interface CommunityRow extends Community {
    actions: ReactNode
}

export interface IViewCommunities {
    guidingCommunities?: boolean
    myCommunities?: boolean
}

export const ViewCommunities = (props: IViewCommunities) => {
    const auth = useContext(AuthContext)

    const [showAddNew, setShowNew] = useState(false)
    const [editCommunity, setEditCommunity] = useState<Community>()
    const [dirty, setDirty] = useState(false)

    const parseData = (args: { data: Community[] }) => {
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
        (data: Community) => (
            <Container direction={Direction.row} padding="0">
                <RbacLinker
                    href={`/${
                        props.guidingCommunities
                            ? 'guide-communities'
                            : props.myCommunities
                            ? 'my-communities'
                            : 'communities'
                    }/${data._id}/`}
                    hocLink
                >
                    <IconButton>
                        <BiShowAlt />
                    </IconButton>
                </RbacLinker>
                {!props.guidingCommunities && !props.myCommunities ? (
                    <IconButton
                        onClick={() => {
                            setEditCommunity(data)
                            setShowNew(true)
                        }}
                    >
                        <BiEditAlt />
                    </IconButton>
                ) : (
                    <></>
                )}
            </Container>
        ),
        [props.guidingCommunities, props.myCommunities]
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
                        {props.guidingCommunities
                            ? 'Guiding Communities'
                            : props.myCommunities
                            ? 'My Communities'
                            : 'Communities'}
                    </Typography>
                    <Spacer height="20px" />

                    <Card>
                        <Table
                            dirty={dirty}
                            setDirty={setDirty}
                            apiCall={
                                props.myCommunities
                                    ? () =>
                                          getCommunityTable({
                                              filter: {
                                                  memberIds: auth.user._id
                                              }
                                          })
                                    : props.guidingCommunities
                                    ? () =>
                                          getCommunityTable({
                                              filter: {
                                                  guide: auth.user._id
                                              }
                                          })
                                    : getCommunityTable
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
            {!props.guidingCommunities && !props.myCommunities ? (
                <>
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
            ) : (
                <></>
            )}
        </>
    )
}
