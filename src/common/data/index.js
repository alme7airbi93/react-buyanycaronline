import Makes from "./makes.json";
import Model_first_level from "./model_first_levels.json";
import Model_second_level from "./model_second_levels.json";


export const makes = () => {
	return Makes.RECORDS.map(item => {
		return {
			value: item.id,
			label: item.make_name,
			parent_id: item.vehicle_id
		};
	});
};
export const models = () => {
	return Model_first_level.RECORDS.map(item => {
		return {
			value: item.id,
			label: item.model_first_level_name,
			parent_id: item.make_id
		};
	});
};
export const models_second = () => {
	return Model_second_level.RECORDS.map(item => {
		return {
			value: item.id,
			label: item.model_second_level_name,
			parent_id: item.model_first_level_id
		};
	});
};
