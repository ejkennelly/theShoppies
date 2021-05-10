import React from 'react';

const MovieListHeading = (props) => {
	return (
		<div className='col'>
			<h1>{props.heading}</h1>
			<h4>{props.subheader}</h4>
		</div>
	);
};

export default MovieListHeading;