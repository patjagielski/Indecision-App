class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePickOption = this.handlePickOption.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteSingleOption = this.handleDeleteSingleOption.bind(this);
        this.state = {
            options: []
        };
    }
    componentDidMount(){
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
        
            if(options){
                this.setState(() => ({ options}))
            }
        }catch(e){

        }
        
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
        
    }
    componentWillUnmount(){
        console.log('it unmounted!');
    }
    handleDeleteOptions(){
        this.setState(()=>({ options: [] }));
    }
    handleDeleteSingleOption(optionToRemove){
        this.setState((prevState) =>({
            options: prevState.options.filter((option)=> optionToRemove !== option )
        }));
    }
    handlePickOption(){
       
        const rand = Math.floor(Math.random()*this.state.options.length);
        const decision = this.state.options[rand];
        alert(decision);
    
    }
    handleAddOption(option){
        if(!option){
            return "Please enter a valid value";
        }else if(this.state.options.indexOf(option) > -1){
            return "This value is already exists";
        }
        this.setState((prevState)=>({
            options: prevState.options.concat(option)
        }));
    }
    render(){
        
        const subtitle = "Put your life in the hands of a computer";
        
        return(
            <div>
                <Header subtitle={subtitle}/>
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    handlePickOption={this.handlePickOption}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteSingleOption={this.handleDeleteSingleOption}
                />
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}


const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};

Header.defaultProps = {
    title: "Indecision"
};

const Action = (props) =>{
    return(
        <div>
            <button onClick={props.handlePickOption} disabled={!props.hasOptions}>What should I do?</button>
        </div>
    );
};

const Options = (props) =>{
    return(
        <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.length === 0 && <p>No options available. Add an option to get started!</p>}
        {
            props.options.map((el)=>(
                <Option 
                    key={el} 
                    optionText={el}
                    handleDeleteSingleOption={props.handleDeleteSingleOption}
                />
            ))
        }
    </div>
    );
}

const Option = (props) =>{
    return (
        <div>
            {props.optionText}
            <button 
            onClick={(el)=>{
                props.handleDeleteSingleOption(props.optionText)
            }}>
            Remove
            </button>
        </div>
    );
}


class AddOption extends React.Component{
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state= {
            error: undefined
        };
    }
    handleAddOption(e){
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        
        this.setState(()=>({ error }));
        if(!error){
            e.target.elements.option.value = '';
        }
    }
    render(){
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.handleAddOption}>
            <input type="text" name="option"/>
            <button>Add Option</button>
            </form>
            </div>
        );
    }
}

// const User = (props) => {
//     return(
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>
//     );
// };

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));