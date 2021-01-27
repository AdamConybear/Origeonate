import React from "react";
import styled, { keyframes } from "styled-components";

const ProgressBar = (props) => {
	const { bgcolor, completed } = props;

	const ProgressContainer = styled.div`
		height: 20px;
		display: flex;
		align-items: center;
		margin-left: auto;
		margin-right: auto;
		width: 60%;
		background-color: rgb(224, 224, 222);
		border-radius: 50px;
		margin-bottom: 20px;
	`;

	const appear = keyframes`
        from{
            width:0;
            opacity:0
        } 
        to{
            width:${completed}%;
            opacity:1
        }
    `;
	const ProgressFiller = styled.div`
		height: 100%;
		width: 0;
		background-color: ${bgcolor};
		border-radius: inherit;
		text-align: right;
		animation-name: ${appear};
		animation-delay: 0.3s;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	`;

	const Label = styled.span`
		padding: 5px;
		color: white;
		font-weight: bold;
	`;

	return (
		<ProgressContainer>
			<ProgressFiller>
				<Label>{`${completed}%`}</Label>
			</ProgressFiller>
		</ProgressContainer>
	);
};

export default ProgressBar;
