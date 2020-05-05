

import React, { Component } from 'react'
import Axios from "axios";
import "./covid19.css";

class Covid19 extends Component {
    constructor(props){
        super(props);
        this.getCountryData =this.getCountryData.bind(this);
    }
    state = {
        confirmed: "loading",
        recovered: "loading",
        deaths: "loading",
        countries: []
      };
      componentDidMount() {
        this.getData();
      }
    
      async getData() {
        const resApi = await Axios.get(`https://covid19.mathdro.id/api`);
        const resCountries = await Axios.get(
            "https://covid19.mathdro.id/api/countries" );
        const countries = resCountries.data.countries;
    
        this.setState({
          confirmed: resApi.data.confirmed.value,
          recovered: resApi.data.recovered.value,
          deaths: resApi.data.deaths.value,
          countries
        });
      }
      async getCountryData(e){
          if (e.target.value === "Worldwide"){
            return this.getData();
                }
          try{
          const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
          this.setState({
            confirmed: res.data.confirmed.value,
            recovered: res.data.recovered.value,
            deaths: res.data.deaths.value

          });
        }
        catch(err){
            if(err.response.status === 404)
                this.setState({
                    confirmed: "no data",
                    recovered: "no data",
                    deaths: "no data"
        

                });
        }
      }
      renderCountryOption() {
         return this.state.countries.map((country, i) =>{
                return <option key={i}>{country.name}</option>
                
          });
      }
    render() {
        return (
            <div className="container">
              <div >  <h1>CORONA UPDATE</h1></div>
              <div >
                  <select className="dropdown" onChange={this.getCountryData}>
                      <option>Worldwide</option>
                    {this.renderCountryOption()}
                </select>
        
              </div>  
              <div className="flex">
                
               <h3 className="box confirmed">Confirmed Cases {this.state.confirmed}</h3> 
                <h3 className="box recovered">Recovered Cases {this.state.recovered}</h3> 
                <h3 className="box deaths">Deaths Reported {this.state.deaths}     </h3>
              
            </div>
            </div>
        )
    }
}

export default Covid19