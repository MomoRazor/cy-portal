import {
    Alignment,
    Colors,
    Container,
    Direction,
    Icon,
    SizeContext,
    Spacer,
    TextVariants,
    TitledRow,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { useContext } from 'react'
import { BiInfoCircle } from 'react-icons/bi'
import { Community } from '../restAPI'

export interface IViewCommunityData {
    community: Community
}

export const ViewCommunityData = (props: IViewCommunityData) => {
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
                        label="Name"
                        data={<Typography>{props.community.name}</Typography>}
                    />
                </Container>
            </Container>
        </Container>
    )
}
