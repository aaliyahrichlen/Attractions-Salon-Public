import React from 'react';
import './Services.css';
import CardGroupProps from '../../components/CardGroup/CardGroupProps.js'
import Footer from "../../components/Footer/Footer";
import { Divider } from 'semantic-ui-react'

function Services() {
    return (
        <div >

            <Divider horizontal>
                Full Set
            </Divider>
            <CardGroupProps category={'Full Set'} />
            
            <Divider horizontal>
                Pedicure
            </Divider>
            <CardGroupProps category={'Pedicure'} />
            
            <Divider horizontal>
                Manicure
            </Divider>
            <CardGroupProps category={'Manicure'} />

            
            <Divider horizontal>
                Fill
            </Divider>
            <CardGroupProps category={'Fill'} />

            
            <Divider horizontal>
                Polish
            </Divider>
            <CardGroupProps category={'Polish'} />

            <Footer/>
        </div>
    );
}

export default Services;