import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import FilterButton from '../utils/filter'
import Search from '../utils/search'

class Home extends Component {

    state = {
        bigData: null,
    }

    async componentDidMount(){
        const dataFetch = await axios.get('http://localhost:3002/restaurantes')
        this.setState({bigData: dataFetch.data})
    }

    orderRatingData(rawData){        
        const ratingData = rawData.sort((a,b) => {
            return b.rating - a.rating
        })
        this.setState({bigData: ratingData})
    }

    orderAlphabetData(rawData){
        const alphabetData = rawData.sort((a,b) => {
            return a.name < b.name ? -1 : 1
        })
        this.setState({bigData: alphabetData})
    }

    handleChange = event => {
        console.log(this.state)
        this.setState(
            {
                ...this.state,
                [event.target.name]: event.target.value
            }
        );
    }
    
    handleSubmit = event => {
        event.preventDefault();
        
        const restaurant = {
            id: this.state.id,
            rating: this.state.rating,
            name: this.state.name,
            contact: {
                site: this.state.site,
                email: this.state.email,
                phone: this.state.phone
            },
            address: {
                street: this.state.street,
                city: this.state.city,
                state: this.state.state,
                location: {
                    lat: this.state.lat,
                    lng: this.state.lng
                }
            }
        }

        axios.post(`http://localhost:3002/restaurantes`, restaurant)
        .then(res => {
            console.log(res.data)
        })
    }


    handleLogin = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.loginemail,
            password: this.state.loginpassword
        }

        axios({
            method: 'post',
            baseURL: 'http://localhost:3002/api/users/login',
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
            data: user
        })
        .then(res => {
            console.log(res.data)
            return res.data
        })
    }

    render(props) {
        const datalist = this.state.bigData ? this.state.bigData : []
        return (
            <div>
                <form onSubmit={this.handleLogin}>
                    <input type="text" name="loginemail" onChange={this.handleChange} />
                    <input type="password" name="loginpassword" onChange={this.handleChange}/>
                    <button type="submit">Add</button>
                </form>
                <hr/>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                                Id: <input type="text" name="id" onChange={this.handleChange} />
                                Rating: <input type="text" name="rating" onChange={this.handleChange} />
                                Name: <input type="text" name="name" onChange={this.handleChange} />
                                Site: <input type="text" name="site" onChange={this.handleChange} />
                                Email: <input type="text" name="email" onChange={this.handleChange} />
                                Phone: <input type="text" name="phone" onChange={this.handleChange} />
                                Street: <input type="text" name="street" onChange={this.handleChange} />
                                City: <input type="text" name="city" onChange={this.handleChange} />
                                State: <input type="text" name="state" onChange={this.handleChange} />
                                Lat: <input type="text" name="lat" onChange={this.handleChange} />
                                Lng: <input type="text" name="lng" onChange={this.handleChange} />
                        <button type="submit">Add</button>
                    </form>
                <hr/>
                <Search />
                <FilterButton value="By Rating" orderingData={() => this.orderRatingData(this.state.bigData)}/>
                <FilterButton value="Alphabetically" orderingData={() => this.orderAlphabetData(this.state.bigData)}/>
                <h1>
                    {
                        Object.keys(datalist).map((key, index) => {
                        return (
                            <article key={index}>
                            <Link to={`/${datalist[key].id}`}><h1>{datalist[key].name}</h1></Link>
                            <p>{datalist[key].address.location.lat}</p>
                            <p>{datalist[key].address.location.lng}</p>
                            <p>{datalist[key].rating}</p>
                            
                            </article>
                            )
                        })
                    } 
                </h1>
            </div>
        );  
    }
}

export default Home;