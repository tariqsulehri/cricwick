import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

function BasicExample() {
    return (
        <Router>
            <div>
               
                <AuthButton/> 

                <ul>
                    <li>
                        <Link to="/1">Home</Link>
                    </li>

                    <li>
                        <Link to="/login">Login</Link>
                    </li>

                    <li>
                        <Link to="/allMatches/desc">All Macthes</Link>
                    </li>

                    <li>
                        <Link to="/series">Series</Link>
                    </li>

                    <li>
                        <Link to="/videos">Videos</Link>
                    </li>

                    <li>
                        <Link to="/stories">Stories</Link>
                    </li>

                    <li>
                        <Link to="/ranking">Ranking</Link>
                    </li>

                </ul>

                <hr />
                <Route exact path='/:id?' component={Home} />
                <Route  path='/allMatches/:direction(asc|desc)' component={AllMatches} />
                <Route  path='/series' component={Series} />
                <PrivateRoute  path='/videos' component={Videos} />
                <Route  path='/stories' component={Stories} />
                <Route  path='/login' component={Login} />
                <Route  path='/ranking' component={Ranking} />
            </div>
        </Router>
    );
}
        

function Home({ match }) {
    return (
        <div>
            <h2>
                 Home Id : {match.params.id} 
            </h2>
        </div>

    );
}

function Login() {
    return (
        <div>
            <h2>
                 Login 
            </h2>
        </div>

    );
}



function AllMatches({match}) {
    return (
        <div>
            <h2>All Matches</h2>
               Order:{match.params.direction}
        </div>
    );
}

function Series(){
     return(
        <h2>Series</h2>
    );
}        

function Videos(){
     return(
        <h2>Videos</h2>
    );
}        

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }

};
  
const AuthButton = withRouter(
   ({history}) => fakeAuth.isAuthenticated ? (
       <p> 
           Welcome ! { " "}
           <button onClick={() =>{
                fakeAuth.signout(()=> history.push("/"));     

           }}>
            Sign Out
           </button>
            
       </p> ) : (<p> you are not logged in.</p>)
 );

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }

                    }}
                    />

                )
            }
        />
    );
}

function Stories(){
     return(
        <h2>Stories</h2>
     );
}        
        
function Ranking() {
    return (
        <div>
            <h2>Ranking</h2>
        </div>
    );
}

export default BasicExample;