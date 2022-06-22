import {
    Alignment,
    Colors,
    Container,
    Direction,
    Icon,
    Linker,
    SizeContext,
    Spacer,
    TextVariants,
    TitledRow,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import React, { useContext } from 'react'
import { BiInfoCircle } from 'react-icons/bi'
import { IUser } from '../restAPI'

export interface IViewUserData {
    user: IUser
}

export const ViewUserData = (props: IViewUserData) => {
    const size = useContext(SizeContext)

    return (
        <Container padding="0">
            <Container direction={Direction.row} padding="0" crossAxis={Alignment.center}>
                <Icon color={Colors.title}>
                    <BiInfoCircle size={25} />
                </Icon>
                <Spacer />
                <Typography variant={TextVariants.h5}>Main Information</Typography>
            </Container>
            <Spacer height="10px" />
            <Container
                width="100%"
                padding="0"
                direction={size.mobile ? Direction.column : Direction.row}
                mainAxis={Alignment.spaceBetween}
            >
                <Container width={size.mobile ? '100%' : '50%'} padding="0">
                    <TitledRow label="Name" data={<Typography>{props.user.name}</Typography>} />
                    <TitledRow
                        label="Surname"
                        data={<Typography>{props.user.surname}</Typography>}
                    />
                    <TitledRow label="Email" data={<Typography>{props.user.email}</Typography>} />
                </Container>
            </Container>
            <Container direction={Direction.row} padding="0" crossAxis={Alignment.center}>
                <Icon color={Colors.title}>
                    <BiInfoCircle size={25} />
                </Icon>
                <Spacer />
                <Typography variant={TextVariants.h5}>Connection Information</Typography>
            </Container>
            <Spacer height="10px" />
            <Container
                width="100%"
                padding="0"
                direction={size.mobile ? Direction.column : Direction.row}
                mainAxis={Alignment.spaceBetween}
            >
                <Container width={size.mobile ? '100%' : '50%'} padding="0">
                    {props.user.communityMemberOf ? (
                        <TitledRow
                            label="Member Of"
                            data={
                                <Linker
                                    to={`/communities/${props.user.communityMemberOf.id}/`}
                                    width="auto"
                                >
                                    <Typography>{props.user.communityMemberOf.name}</Typography>
                                </Linker>
                            }
                        />
                    ) : (
                        <></>
                    )}
                    {props.user.communityGuideOf ? (
                        <TitledRow
                            label="Guide Of"
                            data={props.user.communityGuideOf.map((community) => (
                                <Linker
                                    key={community.id}
                                    to={`/communities/${community.id}/`}
                                    width="auto"
                                >
                                    <Typography>{community.name}</Typography>
                                </Linker>
                            ))}
                        />
                    ) : (
                        <></>
                    )}
                    {props.user.teamMemberOf ? (
                        <TitledRow
                            label="Guide Of"
                            data={props.user.teamMemberOf.map((team) => (
                                <Linker key={team.id} to={`/teams/${team.id}/`} width="auto">
                                    <Typography>{team.name}</Typography>
                                </Linker>
                            ))}
                        />
                    ) : (
                        <></>
                    )}
                </Container>
            </Container>
        </Container>
    )
}
