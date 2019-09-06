import React, {useState, cloneElement} from 'react';
import PropTypes from 'prop-types';

const EndlScroll = ({
	ItemBlock, data, styles, itemStyles, itemHeight, itemsCount
}) => {
	const [offset, setOffset] = useState(0);
	const [limit, setLimit] = useState(itemsCount);

	const firstElementHeight = data.length * 50;

	const editFilter = ({target: {scrollTop}}) => {
		const newOffset = Math.floor(scrollTop / itemHeight);

		if (offset !== newOffset) {
			setOffset(newOffset);
		}
	};

	return(
		<div onScroll={editFilter} style={{...blockStyles, ...styles}}>
			<div style={{...firstElement, height: `${firstElementHeight}px`}} />
			
			{data.slice(offset, limit + offset).map((item, key) => (
				<div
					key={item.id} 
					style={{
						height: `${itemHeight}px`,
						top: `${(offset + key) * itemHeight}px`,
						...itemStyles,
						...itemStaticStyles
				}}>
					<ItemBlock
						item={item}
					/>
				</div>
			))}
		</div> 
	);
};

const blockStyles = {
	overflowY: 'scroll',
	position: 'relative',
};

const firstElement = {
	width: '100%',
};

const itemStaticStyles = {
	position: 'absolute',
	left: '0',
	width: '100%'
};

EndlScroll.defaultProps = {
	itemsCount: 30,
};

EndlScroll.propTypes = {
	data: PropTypes.array.isRequired,
	ItemBlock: PropTypes.func.isRequired,
	itemHeight: PropTypes.string.isRequired,
	itemsCount: PropTypes.number.isRequired,
};

export default EndlScroll;