import React from "react";
import { Helmet } from "react-helmet";
const Meta = ({ title, description, keywords }) => {
	return (
		<div>
			<Helmet>
				<title>{title}</title>
				<meta name="description" content={description}></meta>
				<meta name="keyword" content={keywords}></meta>
			</Helmet>
		</div>
	);
};

export default Meta;

Meta.defaultProps = {
	title: "Welcome to PC Gamers Mart",
	keywords: "Buy the latest and best pc gadgets",
	description: "We sell the best and only the best products",
};
