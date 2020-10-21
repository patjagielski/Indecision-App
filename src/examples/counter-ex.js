class Counter extends React.Component {
    constructor(props){
        super(props);
        this.handleReset = this.handleReset.bind(this);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.state = {
            count: 0
        };
    }
    componentDidMount(){
        try{
            const json = localStorage.getItem('count');
            const count = JSON.parse(json);
            if(!isNaN(count)){
                this.setState(() => ({count}))
            }
        }catch(e){
            
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.count !== this.state.count){
            const json = JSON.stringify(this.state.count);
            localStorage.setItem('count',json);
        }

    }
    handleReset(){
        this.setState(() =>{
            return{
                count: 0
            };
        });
    }
    handleMinusOne(){
        this.setState((prevState) =>{
            return{
                count: prevState.count - 1
            };
        });
    }
    handleAddOne(){
        this.setState((prevState) =>{
            return {
                count: prevState.count + 1
            };
        });
    }
    render(){
        return(
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter/>, document.getElementById('app'));

