import mongoose from "mongoose";
import { IAmenity } from "../interfaces/amenity.interface";

const amenitySchema = new mongoose.Schema<IAmenity>({
  name: { type: String, required: true }
});

const AmenityModel = mongoose.model("amenity", amenitySchema);

export default AmenityModel;
