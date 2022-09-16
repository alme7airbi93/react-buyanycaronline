import React from "react";
import { createAdvertisement, deActivateAdvertisement, activateAdvertisement } from "../../repository/AdvertisementDB.js";
import Car from "../../models/Car";
import Motorcycle from "../../models/Motorcycle";
import HeavyVehicle from "../../models/HeavyVehicle";
import Boat from "../../models/Boat";
import PlateNumber from "../../models/PlateNumber";
import Accessories from "../../models/Accessories";
const Test = () => {
    const addAdvertisementr=async()=>{
        let advert_type="3";
        let vehicle_type="1";
        let advetise_info="";
        let customer_type="customer";// or Admin
        if(advert_type=="1"){
            if(vehicle_type=="1"){
                advetise_info =new Car("My Car","Car Description",1200,{city:"Delhi"},customer_type,"",1,2,1,4,10,["fine","excellent"],"Grey",2016,true,1,true,98701,1,40000,"Metalic",7653636,4,1400);
            }else if(vehicle_type=="2"){
                advetise_info =new Motorcycle("My Motorcycles","Motorcycles Description",1200,{city:"Delhi"},customer_type,"",1,2,1,4,10,["fine","excellent"],"Grey",2016,true,1,true,98701,2,350,35000,1);
            }else if(vehicle_type=="3"){
                advetise_info =new HeavyVehicle("My HeavyVehicle","Description",1200,{city:"Delhi"},customer_type,"",1,2,1,4,10,["fine","excellent"],"Grey",2016,true,1,true,98701,3,6,"200T",1);                
            }else if(vehicle_type=="4"){
                advetise_info =new Boat("My HeavyVehicle","Boat Description",1200,{city:"Delhi"},customer_type,"",1,2,1,4,10,["fine","excellent"],"Grey",2016,true,1,true,98701,4,1,"25 Meter",60);
            }
        }else if(advert_type=="2"){
            advetise_info =new PlateNumber("My PlateNumber","PlateNumber Description",1200,{city:"Delhi"},customer_type,"",2,20,1,5,9090900,89);
        }else if(advert_type=="3"){
            advetise_info =new Accessories("My Accessories","Accessories Description",1200,{city:"Delhi"},customer_type,"",3,20,1,2,5,2018,"Gear Box");
        }
        await createAdvertisement(advetise_info);
    };
    const updatedeactivateAdvertisement = async () => {
        let advertId="LkUWtLrFD6nKPgFFonix";
        await deActivateAdvertisement(advertId);
    };
    const updatedActivateAdvertisement = async () => {
        let advertId="LkUWtLrFD6nKPgFFonix";
        await activateAdvertisement(advertId);
    };

    return (
        <>
            <div className="App">
                <div className="card">
                    <div className="card-body">
                        <button onClick={() => addAdvertisementr()} name="add_user" className="btn btn-primary">Add Advertisement</button> &nbsp;
                        <button onClick={() => updatedeactivateAdvertisement()} name="add_user" className="btn btn-primary">DeActivate Advertisement</button>&nbsp;
                        <button onClick={() => updatedActivateAdvertisement()} name="getUser" className="btn btn-primary">Activate Advertisement</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Test;
