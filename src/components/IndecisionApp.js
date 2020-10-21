import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component{
    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOptions = () => {
        this.setState(()=>({ options: [] }));
    };

    handleDeleteSingleOption = (optionToRemove) => {
        this.setState((prevState) =>({
            options: prevState.options.filter((option)=> optionToRemove !== option )
        }));
    };

    handleDeleteSelectedOption = () =>{
        this.setState(()=>({
            selectedOption: undefined
        }));
    };

    handlePickOption = () => {
       
        const rand = Math.floor(Math.random()*this.state.options.length);
        const decision = this.state.options[rand];
        
        this.setState(()=>({
            selectedOption: decision
        }));
    };

    handleAddOption = (option) => {
        if(!option){
            return "Please enter a valid value";
        }else if(this.state.options.indexOf(option) > -1){
            return "This value is already exists";
        }
        this.setState((prevState)=>({
            options: prevState.options.concat(option)
        }));
    };

    componentDidMount(){
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
        
            if(options){
                this.setState(() => ({ options}))
            }
        }catch(e){

        }
        
    };

    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
        
    }

    componentWillUnmount(){
        console.log('it unmounted!');
    }

    render(){
        
        const subtitle = "Put your life in the hands of a computer";
        
        return(
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action 
                    hasOptions={this.state.options.length > 0} 
                    handlePickOption={this.handlePickOption}
                    />
                    <div className="widget">
                        <Options 
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteSingleOption={this.handleDeleteSingleOption}
                        />
                        <AddOption handleAddOption={this.handleAddOption}/>
                    </div>
                <OptionModal 
                    handleDeleteSelectedOption={this.handleDeleteSelectedOption}
                    selectedOption={this.state.selectedOption} />
                </div>   
            </div>
        );
    }
}


