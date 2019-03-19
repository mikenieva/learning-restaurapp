import React, { Component } from 'react';
import axios from 'axios'

class Map extends Component {

    state = {
        currentMapLat: null,
        currentMapLng: null
    }

    // initialize () {
    //     const geocoder = new google.maps.Geocoder();
    //     var latlng = new google.maps.LatLng(-34.397, 150.644);
    //     var mapOptions = {
    //       zoom: 8,
    //       center: latlng
    //     }
    // }

    async componentDidMount(){
        const data = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
        +Mountain+View,+CA&key=${process.env.REACT_APP_GOOGLE_API_KEY}`).then(response => response.data.results)
        
        console.log(data)
    }

    render() {
        return (
            <div>
                AQUÍ VA EL MAPA
                {this.props.lat}
                {this.props.lng}
            </div>
        );
    }
}

export default Map;