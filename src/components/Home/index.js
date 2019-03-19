import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import FilterButton from '../utils/filter'
import Search from '../utils/search'

class Home extends Component {

    state = {
        bigData: null
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

    render(props) {
        const datalist = this.state.bigData ? this.state.bigData : []
        
        return (
            <div>
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