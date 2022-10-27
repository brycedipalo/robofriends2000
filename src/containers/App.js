import React from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/scroll';
import ErrorBoundry from '../components/ErrorBoundry';


//useState
//useEffect

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''  
        }
    }    
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>{return response.json();})
        .then(users => {this.setState({robots: users})});
    }

    onSearchChange = (event) => {this.setState({ searchfield: event.target.value})}

    render(){
        const {robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());    
        })
        return !robots.length? <h1>Loading...</h1>:(
                <div className='tc'>
                    <h1 className='f1'> Robofriends</h1> 
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <Cardlist robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
        );
    }
}

export default App;