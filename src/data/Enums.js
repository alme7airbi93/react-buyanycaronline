import Makes from "./makes.json";
import Model_first_level from "./model_first_levels.json";
import Model_second_level from "./model_second_levels.json";



export const makes = () => {
	let makes_options = Makes.RECORDS.map(item => {
		return {
			value: item.id,
			label: item.make_name,
			parent_id: item.vehicle_id
		};
	});

	return makes_options;
};
export const models = () => {
	let model_first_level_options = Model_first_level.RECORDS.map(item => {
		return {
			value: item.id,
			label: item.model_first_level_name,
			parent_id: item.make_id
		};
	});
	return model_first_level_options;
};
export const models_second = () => {
	let model_second_level_options = Model_second_level.RECORDS.map(item => {
		return {
			value: item.id,
			label: item.model_second_level_name,
			parent_id: item.model_first_level_id
		};
	});
	return model_second_level_options;
};

