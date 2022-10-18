import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'] },
    client: {
        type: mongoose.Schema.Types.ObjectId, // _id => ObjectId that relates to another model
        ref: 'Client', // relates to ClientModel
    },
});

const ProjectModel = mongoose.model('Project', ProjectSchema);
export default ProjectModel;