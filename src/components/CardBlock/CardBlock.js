import { Card } from "react-bootstrap"
import "./style.css";
const CardBlock = ({item}) => {


    return(
        <Card className="p-3 card-block">

            <div className="d-flex justify-content-between">
                <div>
                    <h5>{item._title}</h5>
                    <p className="m-0"><b>Year {item._year}</b></p>
                </div>
                <div>
                    <h4>{item._price}/-</h4>
                </div>
            </div>

            <p >{item._description}</p>
            <ul className="tags">
                <li>Color: {item._color}</li>
                <li>Type: {item._bodyType}</li>
                <li>Fuel Type: {item._fuel_type}</li>
                <li>HP: {item._horsePower}</li>
                <li>Region: {item._region}</li>
                <li>Transmission: {item._transmission}</li>
                <li>_warranty: {item._warranty}</li>
                
            </ul>
          
          
            <p className="p-0 m-0 mt-2">{item._condition}</p>
        </Card>
    )
}
export default CardBlock;