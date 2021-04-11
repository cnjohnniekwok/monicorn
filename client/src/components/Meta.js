import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>All Things Fluffy | {title}</title>
			<meta name="description" content={description} />
			<meat name="keywords" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: "",
	description: "",
	keywords: "",
};

export default Meta;