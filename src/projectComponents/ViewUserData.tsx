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
import { User } from '../restAPI'

export interface IViewUserData {
    user: User
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
                    {props.user.communityMemberOf && props.user.communityMemberOf.length > 0 ? (
                        <TitledRow
                            label="Member Of"
                            data={props.user.communityMemberOf.map((community) => (
                                <Linker
                                    href={`/communities/${community._id}/`}
                                    hocLink
                                    key={community._id}
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
                    {props.user.communityGuideOf && props.user.communityGuideOf.length > 0 ? (
                        <TitledRow
                            label="Guide Of"
                            data={props.user.communityGuideOf.map((community) => (
                                <Linker
                                    key={community._id}
                                    href={`/communities/${community._id}/`}
                                    hocLink
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
                                <Linker key={team._id} href={`/teams/${team._id}/`} hocLink>
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
