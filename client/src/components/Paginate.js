import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((x) => (
					//there are two routes for page, one with keywords, one without.
					//this is just the listProudct route.
					<LinkContainer
						key={x + 1}
						to={
							!isAdmin
								? keyword
									? `/search/${keyword}/page/${x + 1}`
									: `/page/${x + 1}`
								: `/admin/productlist/${x + 1}`
						}
					>
						<Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
					</LinkContainer>
				))}
			</Pagination>
		)
	);
};

export default Paginate;
