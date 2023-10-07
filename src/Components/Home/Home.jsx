import React from 'react';
import styles from './Home.module.css';
import FeatcherdProducts from '../FeatcherdProducts/FeatcherdProducts';
import CategoresSlider from '../CategorsSlaider/CategoresSlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import Code from '../Code/Code';



export default function Home() {
 
  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <div className="container">
  
  
    <MainSlider/>
    <CategoresSlider/>
  <FeatcherdProducts/>
  </div>
  </> 
  
}
