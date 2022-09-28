import React from 'react';
import axios from "axios";

import {useNavigate} from 'react-router-dom';
import {Controls} from "../components/Controls";
import {List} from "../components/List";
import {Card} from "../components/Card";

import {ALL_COUNTRIES} from "../config";

export const HomePage = ({countries, setCountries}) => {
  const [filteredCountries, setFilteredCountries] = React.useState(countries);
  const handleSearch = (search, region) => {
    let data = [...countries]

    if (region) {
      data = data.filter(c => c.region.includes(region))
    }

    if (search) {
      data = data.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
    }

    setFilteredCountries(data)
  }


  const navigate = useNavigate()

  React.useEffect(() => {
    if (!countries.length) {
      axios.get(ALL_COUNTRIES)
        .then(({data}) => setCountries(data))
    }
  }, [])

  React.useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [countries]);



  return (<>
    <Controls onSearch={handleSearch}/>
    <List>
      {filteredCountries.map(c => {
        const countryInfo = {
          img: c.flags.png, name: c.name.common, info: [{
            title: "Population", description: c.population.toLocaleString()
          }, {
            title: "Region", description: c.region
          }, {
            title: "Capital", description: c.capital[0]
          },]
        }
        return <Card key={c.name.common} onClick={() => navigate(`country/${c.name.common}`)} {...countryInfo}/>
      })}
    </List>
  </>);
};
