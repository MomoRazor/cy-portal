import {
    Alignment,
    Colors,
    Container,
    Direction,
    Icon,
    Linker,
    PointerEvents,
    SizeContext,
    Spacer,
    TextVariants,
    TitledRow,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { useContext } from 'react'
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
                    <TitledRow
                        label="Display name"
                        data={<Typography>{props.user.displayName}</Typography>}
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
                                    to={`/communities/${props.user.communityMemberOf._id}/`}
                                    width="auto"
                                >
                                    <Typography
                                        color={Colors.primary}
                                        pointerEvents={PointerEvents.none}
                                    >
                                        {props.user.communityMemberOf.name}
                                    </Typography>
                                </Linker>
                            }
                        />
                    ) : (
                        <></>
                    )}
                    {props.user.communitiesGuideOf ? (
                        <TitledRow
                            label="Guide Of"
                            data={props.user.communitiesGuideOf.map((community) => (
                                <Linker
                                    key={community._id}
                                    to={`/communities/${community._id}/`}
                                    width="auto"
                                >
                                    <Typography
                                        color={Colors.primary}
                                        pointerEvents={PointerEvents.none}
                                    >
                                        {community.name}
                                    </Typography>
                                </Linker>
                            ))}
                        />
                    ) : (
                        <></>
                    )}
                    {props.user.teamMemberOf ? (
                        <TitledRow
                            label="Team Member Of"
                            data={props.user.teamMemberOf.map((team) => (
                                <Linker key={team._id} to={`/teams/${team._id}/`} width="auto">
                                    <Typography
                                        color={Colors.primary}
                                        pointerEvents={PointerEvents.none}
                                    >
                                        {team.name}
                                    </Typography>
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
