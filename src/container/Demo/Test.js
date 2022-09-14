import React from "react";
import { createAdvertisement, deActivateAdvertisement, activateAdvertisement } from "../../repository/AdvertisementDB.js";

const Test = () => {
    const addAdvertisementr=async()=>{
        await createAdvertisement();
    };
    const updatedeactivateAdvertisement = async () => {
        await deActivateAdvertisement();
    };
    const updatedActivateAdvertisement = async () => {
        await activateAdvertisement();
    };

    return (
        <>
            <div className="App">
                <div className="card">
                    <div className="card-body">
                        <button onClick={() => addAdvertisementr()} name="add_user" className="btn btn-primary">Add Advertisement</button>
            &nbsp;
            <button onClick={() => updatedeactivateAdvertisement()} name="add_user" className="btn btn-primary">Update Advertisement</button>
            &nbsp;
            <button onClick={() => updatedActivateAdvertisement()} name="getUser" className="btn btn-primary">Activate Advertisement</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Test;
