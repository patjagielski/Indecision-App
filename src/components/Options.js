import React from 'react';
import Option from './Option';

const Options = (props) =>(
    <div>
        <div className="widget-header">
            <h3 className="widget-header__title">Your Options</h3>
            <button 
                className="button button--link" 
                onClick={props.handleDeleteOptions}> Remove All
            </button>
        </div>
    
    {props.options.length === 0 && <p className="widget-message">No options available. Add an option to get started!</p>}
    {
        props.options.map((el, index)=>(
            <Option 
                key={el} 
                optionText={el}
                count={index+1}
                handleDeleteSingleOption={props.handleDeleteSingleOption}
            />
        ))
    }
</div>
);


export default Options;