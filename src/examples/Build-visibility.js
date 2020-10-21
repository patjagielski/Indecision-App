class VisibilityToggle extends React.Component{
    constructor(props){
        super(props);
        this.handleDetails = this.handleDetails.bind(this);
        this.state ={
            visibility: false,
            name: "Show Details"
        }

    }
    handleDetails(){
        this.setState(() =>{
            if(!this.state.visibility){
                return{
                    visibility: true,
                    name : "Hide Details"
                }
            }else{
                return{
                    visibility: false,
                    name: "Show Details"
                }
            }
        });
    }
    render(){
        return(
            <div>
                <h1>Visibility</h1>
                <button onClick={this.handleDetails}>{this.state.name}</button>
                {this.state.visibility && (
                    <div>
                    <p> Here are some stuff for you to read.</p>
                    </div>
                )}
            </div>
        )
    }
}

ReactDOM.render(<VisibilityToggle/>, document.getElementById('app'));

