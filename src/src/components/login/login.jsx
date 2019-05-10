import React, { Component } from 'react';
import axios from 'axios';
import Input from "../common/input";

class Login extends Component {
    constructor(props) {
        super()
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            seriesData: [],
            data: null,
            baseUrl: 'https://back.cricwick.net/api/v2/series',
            page: 1,
            perPage: 10,
            account:{pin:"", userid:"", username:""}
        }

    }

    componentDidMount() {
        // this.loadSeriesRecords();
    }

    loadSeriesRecords = async() => {
        const { page, perPage } = this.state;

        const Url = this.state.baseUrl + '/'
            + '?page=' + page
            + '&per_page=' + perPage;

        console.log("Series : ", Url);

        try {
           await axios.get(Url, { responseType: 'json' }).then(response => {
                this.setState({ data: response.data });
                this.state.data['live_series'].map((item, i) => (
                    console.log("From Loop : ", item)
                ));

            });

        }
        catch (err) {
            console.log("Error", err);
            window.location.href = '/404notfound';
        };
    }

    handleSumbit = (e) => {
        e.preventDefault();
        console.log("Login : ", e.current);
    }

    handleChange = ({currentTarget: input}) => {
        const account = {...this.state.account};
        account[input.name] =  input.value;
        this.setState({
              account:account    
        })
    }
    
    render() {
        const {account} =  this.state;
        return (
            <div>
                <form onSubmit={this.handleSumbit}>
                    <Input name  = {account.name}
                           id    = {account.name}  
                           value = {account.name}
                           label = "Please Enter Your Number"
                           placeHolder = "03xx xxxx xxx" 
                           focus = {true}
                    />        
                    
                    <button 
                           className="btn btn-primary mt-3" 
                           type="submit">Login
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;