import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	height: 32px;
	padding: 0 24px;
	border: 1px solid #000;
	border-radius: 7px;
	background-color: #eee;

	&:hover {
		cursor: pointer;
	}
`;
