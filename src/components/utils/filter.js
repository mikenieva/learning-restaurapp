import React from 'react';

const FilterButton = (props) => {
    return (
        <div>
             <button onClick={props.orderingData}>{props.value}</button>
        </div>
    );
};

export default FilterButton;        