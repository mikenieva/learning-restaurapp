import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import FilterButton from '../utils/filter'

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

    handleRegisterUser = (event) => {
        event.preventDefault()
        const user = {
            email: this.state.registeremail,
            password: this.state.registerpassword,
            name: this.state.registername,
            lastname: this.state.registerlastname
        }
        console.log("esto enviaste:" , user)
        axios({
            method: 'post',
            baseURL: 'http://localhost:3002/api/users/register',
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
                
                <h1>Login</h1>
                <form onSubmit={this.handleLogin}>
                    <input placeholder="email" type="text" name="loginemail" onChange={this.handleChange} />
                    <input placeholder="password" type="password" name="loginpassword" onChange={this.handleChange}/>
                    <button type="submit">Add</button>
                </form>
                <hr/>
                <h1>Registra un usuario</h1>
                <form onSubmit={this.handleRegisterUser}>
                    <input placeholder="email" type="text" name="registeremail" onChange={this.handleChange} />
                    <input placeholder="password" type="password" name="registerpassword" onChange={this.handleChange}/>
                    <input placeholder="name" type="text" name="registername" onChange={this.handleChange}/>
                    <input placeholder="lastname" type="text" name="registerlastname" onChange={this.handleChange}/>

                    <button type="submit">Crear usuario</button>
                </form>
                <hr/>
                <h1>Registra un restaurante</h1>
                <form onSubmit={this.handleSubmit}>
                                Id: <input type="text" name="id" onChange={this.handleChange} />
                                <br/>
                                Rating: <input type="text" name="rating" onChange={this.handleChange} />
                                <br/>
                                Name: <input type="text" name="name" onChange={this.handleChange} />
                                <br/>
                                Site: <input type="text" name="site" onChange={this.handleChange} />
                                <br/>
                                Email: <input type="text" name="email" onChange={this.handleChange} />
                                <br/>
                                Phone: <input type="text" name="phone" onChange={this.handleChange} />
                                <br/>
                                Street: <input type="text" name="street" onChange={this.handleChange} />
                                <br/>
                                City: <input type="text" name="city" onChange={this.handleChange} />
                                <br/>
                                State: <input type="text" name="state" onChange={this.handleChange} />
                                <br/>
                                Lat: <input type="text" name="lat" onChange={this.handleChange} />
                                <br/>
                                Lng: <input type="text" name="lng" onChange={this.handleChange} />
                                <br/>
                        <button type="submit">Agregar restaurante</button>
                    </form>
                <hr/>
                <h1>Ordena un restaurante</h1>
                <FilterButton value="By Rating" orderingData={() => this.orderRatingData(this.state.bigData)}/>
                <FilterButton value="Alphabetically" orderingData={() => this.orderAlphabetData(this.state.bigData)}/>
                <h1>
                    {
                        Object.keys(datalist).map((key, index) => {
                        return (
                            <article key={index}>
                            <Link to={`/${datalist[key].id}`}><h1>{datalist[key].name}</h1></Link>
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