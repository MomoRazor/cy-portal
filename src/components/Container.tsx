import {styled} from 'solid-styled-components'
import {JSX} from 'solid-js'

export interface IContainer {
	crossAxis?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
	mainAxis?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
	width?: string
	height?: string
	backgroundColor?: string
	children: JSX.Element
	elevated?: boolean
	rounded?: boolean
	padding?: string
}

export const Container = (props: IContainer) => {
	const StyledDiv = styled.div(() => ({
		display: 'flex',
		justifyContent: props.crossAxis,
		alignItems: props.mainAxis,
		width: props.width,
		height: props.height,
		backgroundColor: props.backgroundColor,
		boxShadow: props.elevated
			? ' 0 1px 5px rgba(0, 0, 0, 0.46)'
			: undefined,
		borderRadius: props.rounded ? '5px' : undefined,
		padding: props.padding,
	}))

	return <StyledDiv>{props.children}</StyledDiv>
}
