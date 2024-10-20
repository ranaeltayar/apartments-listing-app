import mongoose from "mongoose";
import { IProject } from "../interfaces/project.interface";

const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema<IProject>({
  name: { type: String, required: true },
});

const ProjectModel = mongoose.model("project", projectSchema);

export default ProjectModel;
