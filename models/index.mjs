import  { Schema, model } from "mongoose";

const todoSchema = new Schema(
    {
        todoContent: { type: String, required: true },
            ip: { type: String }
    },
    { timestamps: true },
);


export const Todo = model("Todo", todoSchema);



// video: { type: Schema.ObjectId, ref: "Video" },

// owner/todoAddBy: { type: Schema.ObjectId, ref: "User" },