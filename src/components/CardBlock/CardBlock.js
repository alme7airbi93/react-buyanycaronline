import { Card } from "react-bootstrap"
import "./style.css";
const CardBlock = ({item}) => {

    return(
        <Card className="p-3 card-block d-flex">
            <div>
                <img src={item._photos[0]} />
            </div>
            <div>
                <div className="d-flex justify-content-between">
                    <div>
                        <h5>{item._title}</h5>
                        <p className="m-0"><b>Year {item._year}</b></p>
                    </div>
                    <div>
                        <h4>{item._price} AED</h4>
                    </div>
                </div>

                {/* <p >{item._description}</p> */}
                <ul className="tags">
                {item._fuel_type && <li>Color: {item._color}</li> }
                    {item._bodyType &&
                        <li>Type: {item._bodyType}</li>
                        }
                {item._fuel_type && <li>Fuel Type: {item._fuel_type}</li>}
                {item._horsePower &&<li>HP: {item._horsePower}</li>}
                {item._region && <li>Region: {item._region}</li>}
                {item._transmission &&<li>Transmission: {item._transmission}</li>}
                {item._warranty &&  <li>warranty: {item._warranty}</li>}
                    
                </ul>
            
            
                {/* <p className="p-0 m-0 mt-2">{item._condition}</p> */}
            </div>
        </Card>
    )
}
export default CardBlock;