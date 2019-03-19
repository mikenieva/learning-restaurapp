import React, { Component } from 'react'
import axios from 'axios'
import Map from './map'


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
                                <p>{restaurant[key].rating}</p>
                                <Map lat={restaurant[key].address.location.lat} lng={restaurant[key].address.location.lng}/>
                            </article>
                            )
                        })
                    } 
                
                

            </div>
        );
    }
}

export default Restaurant