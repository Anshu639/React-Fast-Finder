import React, { useState, useEffect } from 'react';
import './SearchBar.css'; 

import countriesData from '../data/countries.json'; 

const CountrySearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchInput === '') {
      setFilteredCountries([]);
    } else {
      const filtered = countriesData.filter((country) => 
        country.country.toLowerCase().startsWith(searchInput.toLowerCase()) ||
        country.capital.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchInput]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    setSelectedCountry(null); 
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSearchInput(country.country); 
    setFilteredCountries([]); 
  };

  return (
    <div className="country-search-container">
      <label htmlFor="country-search" className="search-label">Search for a country or capital:</label>
      <input
        type="text"
        id="country-search"
        value={searchInput}
        onChange={handleInputChange}
        className="search-input"
        placeholder="Start typing a country or capital"
      />

      {filteredCountries.length > 0 && (
        <table className="country-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Capital</th>
            </tr>
          </thead>
          <tbody>
            {filteredCountries.map((country, index) => (
              <tr
                key={index}
                onClick={() => handleCountrySelect(country)}
                className="table-row"
              >
                <td>{country.country}</td>
                <td>{country.capital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedCountry && (
        <div className="selected-country-details">
          <h3>Selected Country Details:</h3>
          <p><strong>Country:</strong> {selectedCountry.country}</p>
          <p><strong>Capital:</strong> {selectedCountry.capital}</p>
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
