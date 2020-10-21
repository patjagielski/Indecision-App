

//JSX -> JaveScript XML
const appObject ={
    title: "Indecision App",
    subtitle: "This is my first React App woo!",
    options: []
};

const onFormSubmit = (e) =>{
    e.preventDefault();
    
    //targets the form, gets the element, and gets where the name = 'option'
    const option = e.target.elements.option.value;
    if(option){
        appObject.options.push(option);
        e.target.elements.option.value = '';
        renderApp();  
    }
};

const onReset = (e) =>{
    e.preventDefault();

    appObject.options =[];
    renderApp();
};

const onMakeDecision = () =>{
    const randNum = Math.floor(Math.random()*appObject.options.length);
    const option = appObject.options[randNum];
    alert(option);
};

const appRoot = document.getElementById("app");

const renderApp = () =>{
    const template = (
        <div>
            <h1>{appObject.title}</h1>
            {appObject.subtitle && <p>{appObject.subtitle}</p>}
            <p>{appObject.options.length >= 1 ? "Here are your options:" : "No options"}</p>
            <button disabled={appObject.options.length === 0} onClick={onMakeDecision}>What to do?</button>
            <button onClick={onReset}>Reset</button>
            <ol>
                {appObject.options.map((el)=>{
                    return <li key={el}> {el} </li>
                })}
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );
    ReactDOM.render(template, appRoot);
};

renderApp();