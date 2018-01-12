import { Schema, model } from 'mongoose';


const heroSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true,
    collection: 'heroes'
});

export const Hero = model('hero', heroSchema);
