import React from "react";
import ProductDetailView from "./ProductDetailView"; // Assuming the path to the component file
import CardFeaturedProduct from "../card/CardFeaturedProduct"; // Assuming the path to the component file
import CardServices from "../card/CardServices"; // Assuming the path to the component file
import Details from "../others/Details"; // Assuming the path to the component file
import './Style.css'
import List from './List';
import Detail from './Detail';
import Slider from './Slider';
import StarZone from "./StarZone";
import { faBootstrap } from "@fortawesome/free-brands-svg-icons";

export default function MainPage(){
  return (
    <>
    
      <h1>Main Page</h1>
      <div className="row">
        <div className="col-md-8">
          {/* Render ProductDetailView component */}
          {/* <ProductDetailView /> */}
        </div>
        
      </div>
      <div>
        {/* Render Details component */}
        {/* <Detail /> */}
      </div>
     
      
       </>
  );
}
 
