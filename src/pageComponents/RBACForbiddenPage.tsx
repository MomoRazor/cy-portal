import {
    Colors,
    EmptyFunctionHandler,
    SizeContext,
    Container,
    Alignment,
    Overflow,
    Direction,
    Typography,
    TextAlignment,
    Button,
    Spacer,
    PointerEvents
} from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { HistoryContext } from '../projectComponents'

export interface IRBACForbiddenPage {
    backgroundColor?: string | Colors
    lineColor?: string | Colors
    error?: string
    logout?: EmptyFunctionHandler
}

export const RBACForbiddenPage = ({ logout, ...props }: IRBACForbiddenPage) => {
    const router = useRouter()
    const size = useContext(SizeContext)

    const { previous } = useContext(HistoryContext)

    return (
        <Container
            padding="0"
            width="100vw"
            height="100vh"
            mainAxis={Alignment.center}
            crossAxis={Alignment.center}
            overflowX={Overflow.hidden}
            overflowY={Overflow.hidden}
            backgroundColor={props.backgroundColor}
        >
            <Container
                direction={size.mobile ? Direction.column : Direction.row}
                padding="0"
                mainAxis={Alignment.center}
                crossAxis={Alignment.center}
            >
                <Container>
                    <Typography fontSize="80px">403</Typography>
                </Container>

                <Container
                    width={size.mobile ? '200px' : '2px'}
                    padding="0"
                    height={size.mobile ? '2px' : '200px'}
                    backgroundColor={props.lineColor}
                />

                <Container width={size.mobile ? '250px' : '400px'}>
                    <Typography fontSize="60px">SORRY!</Typography>
                    <Typography
                        fontSize="30px"
                        textAlign={size.mobile ? TextAlignment.center : TextAlignment.left}
                    >
                        {props.error ? props.error : 'This page is forbidden'}
                    </Typography>
                </Container>
            </Container>
            <Container
                direction={size.mobile ? Direction.column : Direction.row}
                padding="0"
                mainAxis={Alignment.center}
                crossAxis={Alignment.center}
            >
                <Container direction={Direction.row} mainAxis={Alignment.spaceEvenly}>
                    {previous && previous !== '/' ? (
                        <Button
                            onClick={() => router.back()}
                            outlined
                            hoverColor={Colors.primary}
                            color={Colors.primary}
                        >
                            <Typography color={Colors.title} pointerEvents={PointerEvents.none}>
                                Back
                            </Typography>
                        </Button>
                    ) : (
                        <></>
                    )}
                    <Spacer width="50px" />
                    <Button
                        onClick={() => logout && logout()}
                        outlined
                        hoverColor={Colors.primary}
                        color={Colors.primary}
                    >
                        <Typography color={Colors.title} pointerEvents={PointerEvents.none}>
                            Logout
                        </Typography>
                    </Button>
                </Container>
            </Container>
        </Container>
    )
}

RBACForbiddenPage.defaultProps = {
    backgroundColor: Colors.backgroundDarker,
    lineColor: Colors.background,
    allowBack: true
}
