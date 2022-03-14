import {Button, Col, Form} from "react-bootstrap";
import React, {useContext} from "react";
import {StepsStateInMainCategory} from "../stepsState";
import {NewAdvertisement, UserContext} from "../../../context/Context";

const SummaryDescription = (props) => {

    const [advertisement, setAdvertisement] = useContext(NewAdvertisement);
    const [user, setUser]  = useContext(UserContext);
    
    var title="";
    var price=0;
    var desc="";

    const handler=()=>{
        const summary={"title":title, "description":desc, "price":price, "owner":user.email, "state":false, "views":0};
        setAdvertisement(summary);                
    }    
    return(
        <React.Fragment>
            <Col md={5} className="news_ads_details">
                <h5>Advertisement Summary</h5>
                <hr/>                
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label style={{color: '#fff'}}>Title :</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" onChange={data=>{
                            title=data.target.value
                            }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{color: '#fff'}}>Price :</Form.Label>
                        <Form.Control type="text" placeholder="Enter Price" onChange={data=>{
                            price=parseFloat(data.target.value)
                        }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{color: '#fff'}}>Description :</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Description" onChange={data => {
                            desc=data.target.value
                        }}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button className="next_btn" onClick={()=>{ props.onClick(StepsStateInMainCategory);handler();}}>Next</Button>
                    </Form.Group>
                </Form>
            </Col>
        </React.Fragment>
    )    
}

export default SummaryDescription;
