const mongoose =
require("mongoose");

const projectStatusSchema =
new mongoose.Schema({

    // PROJECT
    project:{

        type:
        mongoose.Schema.Types.ObjectId,

        ref:"MERNProject",

        required:true
    },

    // ADMIN
    admin:{

        type:
        mongoose.Schema.Types.ObjectId,

        ref:"MERNUser",

        required:true
    },

    // MEMBER
    user:{

        type:
        mongoose.Schema.Types.ObjectId,

        ref:"MERNUser",

        required:true
    },

    // STATUS
    status:{

        type:String,

        enum:[
            "To Do",
            "In Progress",
            "Done"
        ],

        default:"To Do"
    },

    // ANSWER
    answer:{

        type:String,

        default:""
    }

},{
    timestamps:true
});

module.exports =

mongoose.models.ProjectStatus ||

mongoose.model(

    "MERNProjectStatus",

    projectStatusSchema
);