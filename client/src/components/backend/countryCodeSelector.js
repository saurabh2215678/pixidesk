import React, { useEffect, useRef, useState } from "react";
import countrycodejson from '../../assets/countrycodes.json';
import countryFlags from 'country-flag-emoji-json';
import { ButtonBase} from '@mui/material';
import { usePopper } from 'react-popper';
import { motion, AnimatePresence } from "framer-motion";
import {List, ListItem, ListItemButton, ListItemText, FormControl, InputLabel, Input } from '@mui/material';
import {useOuterClick} from '../useOuterClick';
const CountryCodeSelector = ({onChange}) =>{
    const [selectedCountry, setSelectedCountry] = useState();
    const [listCountries, setListCountries] = useState();
    const [allCountries, setAllCountries] = useState();

    const [menuOpen, setMenuOpen] = useState(false);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const searchRef = useRef();

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement} }],
        placement: "bottom-start",
    });
    const handleModelClose = () => setMenuOpen(false);
    const handleModeltoggle = () => setMenuOpen(!menuOpen);

    const innerRef = useOuterClick(e => {
        // counter state is up-to-date, when handler is called
        if(e.target.classList.contains('cc_btn') || e.target.classList.contains('country_code_selector')){
            return null;
        }
        if(menuOpen){
            handleModelClose();
        }
      });

    useEffect(()=>{
        const allCountries = countrycodejson;
        allCountries.forEach((country)=>{
            var country_flag = countryFlags.find((e)=>e.code === country.code);
            country['image'] = country_flag?.image;
        });
        setSelectedCountry(allCountries.find((country)=>country.dial_code === "+91"));
        setListCountries(allCountries);
        setAllCountries(allCountries);
    },[]);

    useEffect(()=>{
        onChange({element: referenceElement, country: selectedCountry});
    },[selectedCountry, onChange, referenceElement])

    function searchByDialCode(inputValue){
        const tempCountries =
        allCountries.filter(function(el){
            return el.dial_code.includes(inputValue);
        });
        setListCountries(tempCountries);
    }
    
    function searchByName(inputValue){
        const tempCountries =
        allCountries.filter(function(el){
            const elementCountryName = el.name.toLowerCase();
            return elementCountryName.includes(inputValue.toLowerCase());
        });
        setListCountries(tempCountries);
    }

    const handleSearch = (e)=>{ 
        const inputValue = searchRef.current.firstChild.value;
        if (inputValue.includes('+') || !Number.isNaN(parseInt(inputValue))){
            searchByDialCode(inputValue);
        }else{
            searchByName(inputValue);
        }
        if (e.key === 'Enter') {
            e.preventDefault();
          }
    }

    const handleSelectCountry = (country) => {
        setSelectedCountry(country);
        handleModelClose();
    }

    return (
        <>
        <ButtonBase style={{borderRadius:"0.3rem"}}  ref={setReferenceElement} className="country_code_selector" onClick={handleModeltoggle}>
            <div className="cc_btn">
                {selectedCountry && selectedCountry.image && <img alt={selectedCountry?.name} src={selectedCountry?.image}/>}
                {selectedCountry && selectedCountry?.dial_code}
                
            </div>
        </ButtonBase>

        
        <div ref={setPopperElement} className={`country_code_wrapper ${menuOpen ? "opened": "closed"}`} style={styles.popper} {...attributes.popper}>
            <motion.div
                animate={menuOpen ? { y: 0, opacity: 1, height: "auto", } : {y: 150, opacity: 0, height: 0, }}
                initial={{ y:150, opacity: 0, height: 0, }}
                >
            <div className="country_code_box" ref={innerRef}>
                <div className="search_country">
                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Search Country</InputLabel>
                        <Input type="text" ref={searchRef} onChange={handleSearch} onKeyPress={handleSearch}/>
                    </FormControl>
                </div>
                <List>
                    {
                    listCountries?.map((country, key)=>
                        <ListItem key={key} disablePadding className={country?.dial_code === selectedCountry.dial_code ? 'Selected':''}>
                            <ListItemButton onClick={()=>handleSelectCountry(country)} varient="secondary">
                                {country && country.image && <img className="country_icon" alt={country?.name} src={country?.image}/>}
                                <ListItemText className="country_text" primary={country && `${country?.dial_code} ${country?.name}`} />
                            </ListItemButton>
                        </ListItem>
                    )

                    }
                    
                </List>
                </div>
            <div className="tooltip-arrows" ref={setArrowElement} style={styles.arrow} {...attributes.arrow}/>
            </motion.div>
        </div>
        </>
    );
}
export default CountryCodeSelector;