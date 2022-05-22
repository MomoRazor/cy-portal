import {styled} from 'solid-styled-components'
import {JSX} from 'solid-js'

export interface IContainer {
	crossAxis?: string
	mainAxis?: string
	children: JSX.Element
}

export const Container = (props: IContainer) => {
	const StyledDiv = styled.div(() => ({
		display: 'flex',
		justifyContent: props.crossAxis,
		alignItems: props.mainAxis,
	}))

	return <StyledDiv>{props.children}</StyledDiv>
}
