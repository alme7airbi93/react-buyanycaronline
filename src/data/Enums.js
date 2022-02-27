import Vehicles from './vehicles.json';
import Makes from './makes.json';
import Model_first_level from './model_first_levels.json';




export const vehicles = () => {
    let vehicle_options = Vehicles.RECORDS.map(item => {
        return {
            value: item.id,
            label: item.vehicle_name
        }
    })
    return vehicle_options;
}

export const makes = () => {
    let makes_options = Makes.RECORDS.map(item => {
        return {
            value: item.id,
            label: item.make_name,
            parent_id: item.vehicle_id
        }
    })

    return makes_options;
}

export const models = () => {
    let model_first_level_options = Model_first_level.RECORDS.map(item => {
        return {
            value: item.id,
            label: item.model_first_level_name,
            parent_id: item.make_id
        }
    })
    return model_first_level_options;
}








