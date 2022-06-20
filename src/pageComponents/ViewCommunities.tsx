import {
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
import React, { ReactNode, useCallback, useState } from 'react'
import { BiShowAlt, BiEditAlt } from 'react-icons/bi'
import { CommunityOverlay } from '../projectComponents'
import { getCommunities, ICommunity } from '../restAPI'
import { SidebarPage } from './SidebarPage'

interface CommunityRow extends ICommunity {
    actions: ReactNode
}

export const ViewCommunities = () => {
    const [showAddNew, setShowNew] = useState(false)
    const [editCommunity, setEditCommunity] = useState<ICommunity>()

    const [isOverlay, setIsOverlay] = useState(false)

    const parseData = (data: ICommunity[]) => {
        let array: CommunityRow[] = []

        data.map((data) => {
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
                <Linker to={`/communities/${data.id}/`} width="auto">
                    <IconButton>
                        <BiShowAlt />
                    </IconButton>
                </Linker>
                <IconButton
                    onClick={() => {
                        setEditCommunity(data)
                        setShowNew(true)
                        setIsOverlay(true)
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
        setIsOverlay(false)
    }

    const saveDrawer = () => {
        setEditCommunity(undefined)
        setShowNew(false)
        setIsOverlay(false)
    }

    return (
        <>
            <SidebarPage>
                <Container width="100%">
                    <Typography variant={TextVariants.h4} color={Colors.title}>
                        Communities
                    </Typography>
                    <Spacer height="20px" />

                    <Card>
                        <Table
                            apiCall={getCommunities}
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
                    setIsOverlay(true)
                }}
                zIndex={5}
            >
                <Typography color={Colors.textOnPrimary}>Add Community</Typography>
            </FloatingIconButton>
            <CommunityOverlay
                covered
                onClose={handleDiscard}
                onSave={saveDrawer}
                show={showAddNew}
                data={editCommunity}
                isOverlay={isOverlay}
                setIsOverlay={setIsOverlay}
            />
        </>
    )
}
