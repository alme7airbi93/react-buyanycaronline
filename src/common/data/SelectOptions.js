import { Advertisement_Types } from "./Advertisement_Types.js";
import { Boat_Types } from "./Boat_Types";
import { Heavy_Vehicle_Types } from "./Heavy_Vehicle_Types";
import { Motorcycle_Types } from "./Motorcycle_Types";
import { Fuel_Types } from "./Fuel_Types";
import { Engine_Types } from "./Engine_Types";
import { Transmition_Types } from "./Transmition_Types";
import { Color_Types } from "./Color_Types";
import { Travel_Disttance } from "./Travel_Disttance";
import { Manufacturing_Years } from "./ManufacturingYear.js";
import { Horse_Power } from "./Horse_Power.js";
import { Body_Condition } from "./Body_Condition.js";
import { Warranty_Types } from "./Warranty_Types.js";
import { Region } from "./Region.js";
import { Cylinder_Types } from "./Cylinder_Types.js";
import { Steering_Types } from "./Steering_Types.js";

export const AdvertisementOptions = () => {
  let options = [];
  for (const [key, val] of Object.entries(Advertisement_Types)) {
    options.push({ value: key, label: val });
  }
  return options;
};

export const BoatOptions = () => {
  let options = [];
  for (const [key, val] of Object.entries(Boat_Types)) {
    options.push({ value: key, label: val });
  }
  return options;
};

export const MotorcycleOptions = () => {
  let options = [];
  for (const [key, val] of Object.entries(Motorcycle_Types)) {
    options.push({ value: key, label: val });
  }
  return options;
};

export const HeavyVehicleOptions = () => {
  let options = [];
  for (const [key, val] of Object.entries(Heavy_Vehicle_Types)) {
    options.push({ value: key, label: val });
  }
  return options;
};
export const FuelTypes = () => {
  let options = [];
  for (const [key, val] of Object.entries(Fuel_Types)) {
    options.push({ value: key, label: val });
  }
  return options;
};
export const EngineTypes = () => {
  let options = [];
  for (const [key, val] of Object.entries(Engine_Types)) {
    options.push({ value: key, label: val });
  }
  return options;
};
export const TravelDisttance = () => {
  let options = [];
  for (const [key, val] of Object.entries(Travel_Disttance)) {
    options.push({ value: key, label: val });
  }
  return options;
};

export const ManufacturingYearsOptions = () => {
  let options = [];
  Manufacturing_Years.forEach((value, index) => {
    options.push({ value: value, label: value });
  });
  return options;
};

export const HorsePowerOptions = () => {
  let options = [];
  Horse_Power.forEach((value, index) => {
    options.push({ value: value, label: value });
  });
  return options;
};

export const RegionalOption = () => {
  let options = [];
  for (const [key, val] of Object.entries(Region)) {
    options.push({ value: key, label: val });
  }
  return options;
};
export const TransmitionTypes = () => {
  let options = [];
  for (const [key, val] of Object.entries(Transmition_Types)) {
    options.push({ value: key, label: val });
  }
  return options;
};
export const ColorTypes = () => {
  let options = [];
  for (const [key, val] of Object.entries(Color_Types)) {
    options.push({ value: key, label: val });
  }
  return options;
};
export const BodyCondition = () => {
  let options = [];
  for (const [key, val] of Object.entries(Body_Condition)) {
    options.push({ value: key, label: val });
  }
  return options;
};
export const WarrantyTypes = () => {
  let options = [];
  for (const [key, val] of Object.entries(Warranty_Types)) {
    options.push({ value: key, label: val });
  }
  return options;
};
export const CylinderTypes = () => {
  let options = [];
  for (const [key, val] of Object.entries(Cylinder_Types)) {
    options.push({ value: key, label: val });
  }
  return options;
};
export const SteeringTypes = () => {
  let options = [];
  for (const [key, val] of Object.entries(Steering_Types)) {
    options.push({ value: key, label: val });
  }
  return options;
};
