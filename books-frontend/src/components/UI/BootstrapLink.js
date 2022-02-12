import React from 'react';
import { useLinkClickHandler } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const BootstrapLink = React.forwardRef(
	(
		{
			onClick,
			replace = false,
			state,
			target,
			to,
			...rest
		},
		ref
	) => {
		let handleClick = useLinkClickHandler(to, {
			replace, state, target
		});

		return (
			<Button
				className='w-auto'
				{...rest}
				onClick={event => {
					onClick?.(event);
					if (!event.defaultPrevented) {
						handleClick(event);
					}
				}}
				ref={ref}
				target={target}
			/>
		)
	}
);

export default BootstrapLink