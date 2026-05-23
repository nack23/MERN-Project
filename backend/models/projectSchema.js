const mongoose =
require("mongoose");

const projectSchema =
new mongoose.Schema({

    // PROJECT NAME
    projectName:{

        type:String,

        required:true
    },

    // DESCRIPTION
    description:{

        type:String
    },

    // DUE DATE
    dueDate:{

        type:Date
    },

    // PRIORITY
    priority:{

        type:String,

        enum:[
            "Low",
            "Medium",
            "High"
        ],

        default:"Medium"
    },

    // ADMIN
    admin:{

        type:
        mongoose.Schema.Types.ObjectId,

        ref:"MERNUser",

        required:true
    },

    // MEMBERS
    members:[

        {

            type:
            mongoose.Schema.Types.ObjectId,

            ref:"MERNUser"
        }
    ]

},{
    timestamps:true
});

module.exports =

mongoose.models.MERNProject ||

mongoose.model(

    "MERNProject",

    projectSchema
);