/* eslint-disable */
import { Advertisement_states } from "../data/Advertisement_states.js";
import { Boat_Types } from "../data/Boat_Types.js";
import { Fuel_Types } from "../data/Fuel_Types.js";
import { Heavy_Vehicle_Types } from "../data/Heavy_Vehicle_Types.js";
import { Motorcycle_Types } from "../data/Motorcycle_Types.js";
import { UAE_CITIES } from "../data/UAE_Cities.js";
import { User_Roles } from "../data/User_Roles.js";

export const checkTypeOfAdvertisementStatus = (val) => {
  for (const [key, value] of Object.entries(Advertisement_states)) {
    if (value === val) {
      return true;
    }
  }
  return false;
};

export const checkTypeOfBoats = (val) => {
  for (const [key, value] of Object.entries(Boat_Types)) {
    if (value === val) {
      return true;
    }
  }
  return false;
};
export const checkTypeOfFuels = (val) => {
  for (const [key, value] of Object.entries(Fuel_Types)) {
    if (value === val) {
      return true;
    }
  }
  return false;
};
export const checkTypeOfHeavyVehicle = (val) => {
  for (const [key, value] of Object.entries(Heavy_Vehicle_Types)) {
    if (value === val) {
      return true;
    }
  }
  return false;
};
export const FuelTypes = (val) => {
  for (const [key, value] of Object.entries(Fuel_Types)) {
    if (value === val) {
      return true;
    }
  }
  return false;
};
export const checkTypeOfMotorcycle = (val) => {
  for (const [key, value] of Object.entries(Motorcycle_Types)) {
    if (value === val) {
      return true;
    }
  }
  return false;
};

export const checkTypeOfUAECities = (val) => {
  for (const [key, value] of Object.entries(UAE_CITIES)) {
    if (value === val) {
      return true;
    }
  }
  return false;
};

export const checkTypeUserRoles = (val) => {
  for (const [key, value] of Object.entries(User_Roles)) {
    if (value === val) {
      return true;
    }
  }
  return false;
};
