import React, { Component } from 'react'
import axios from 'axios'

class Restaurant extends Component {
    state = {
        restaurant: null
    }

    async componentDidMount(){
        const currentRestaurant = this.props.match.params.restaurant
        const dataFetch = await axios.get(`http://localhost:3002/${currentRestaurant}`).then(response => response.data)

        this.setState({restaurant: dataFetch})
    }

    render() {
        const restaurant = this.state.restaurant ? this.state.restaurant : []
        return (
            <div>
                {
                    Object.keys(restaurant).map((key, index) => {
                        return (
                            <article key={index}>
                                <h1>{restaurant[key].name}</h1>
                                <p><span>Rating: </span>{restaurant[key].rating}</p>
                                <p><span>Id: </span>{restaurant[key].id}</p>
                                <p><span>Sitio: </span>{restaurant[key].contact.site}</p>
                                <p><span>Email: </span>{restaurant[key].contact.email}</p>
                                <p><span>Teléfono: </span>{restaurant[key].contact.phone}</p>
                                <hr/>
                                <p><span>Ciudad: </span>{restaurant[key].address.street}</p>
                            </article>
                            )
                        })
                    } 
                
            </div>
        );
    }
}

export default Restaurant