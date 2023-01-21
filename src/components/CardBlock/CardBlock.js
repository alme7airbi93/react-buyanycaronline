import { Card } from "react-bootstrap";
import "./style.css";

const CardBlock = ({ item }) => {

    return (
        <div className="card-wrapper">
            <div class="image-wrapper">
                <img src={item._photos[0]} class="card-img" />
            </div>
            <div>
                <h5 class="title">{item._title}</h5>
                <p className="m-0 year-style"><b>Year {item._year}</b></p>
                <h4 class="price">{item._price} AED</h4>

                {/* <p >{item._description}</p> */}
                {/* <ul className="tags">
                {item._fuel_type && <li>Color: {item._color}</li> }
                    {item._bodyType &&
                        <li>Type: {item._bodyType}</li>
                        }
                {item._fuel_type && <li>Fuel Type: {item._fuel_type}</li>}
                {item._horsePower &&<li>HP: {item._horsePower}</li>}
                {item._region && <li>Region: {item._region}</li>}
                {item._transmission &&<li>Transmission: {item._transmission}</li>}
                {item._warranty &&  <li>warranty: {item._warranty}</li>}
                    
                </ul> */}
            
            
                {/* <p className="p-0 m-0 mt-2">{item._condition}</p> */}
            </div>
        </div>
    )
}
export default CardBlock;