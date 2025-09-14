const mongoose = require('mongoose');
const { type } = require('os');
const { title } = require('process');

const introSchema=new mongoose.Schema({
    welcomeText :{
        type : String,
        required:true,
    },
    firstName :{
        type : String,
        required:true,
    },
    lastName:{
        type : String,
        required:true,
    },
    caption :{
        type : String,
        required:true,
    },
    description:{
        type : String,
        required:true,
    }
});

const aboutSchema = new mongoose.Schema({
    lottieURL :{
        type:String,
        required :true
    },
    description1 :{
        type:String,
        required :true
    },
    description2 :{
        type:String,
        required :true
    },
    skills:{
        type:Array,
        required :true
    }
});

const experienceSchema = new mongoose.Schema({
    title : {
        type:String,
        required :true
    },
    period :{
        type:String,
        required :true
    },
    company :{
        type:String,
        required :true
    },
    description : {
        type:String,
        required :true
    }
});

const projectsSchema = new mongoose.Schema({
    title :{
        type:String,
        required :true
    },
    description:{
        type:String,
        required :true
    },
    image:{
        type:String,
        required :true
    },
    link:{
        type:String,
        required :true
    },
    technologies :{
        type:Array,
        required :true
    }
});

const educationSchema =new mongoose.Schema({
    title :{
        type:String,
        required :true
    },
    course :{
        type:String,
        required :true
    },
    marks:{
        type:String,
        required :true
    },
    date:{
        type:String,
        required :true
    }
});

const contactSchema =new mongoose.Schema({
    name :{
        type:String,
        required :true
    },
    email:{
        type:String,
        required :true
    },
    gender :{
        type:String,
        required :true
    },
    address:{
        type:String,
        required :true
    },
    github:{
        type:String,
        default: "https://github.com/SKSingh0703"
    },
    linkedin:{
        type:String,
        default: "https://www.linkedin.com/in/sachin-kumar-90884117a/"
    },
    instagram:{
        type:String,
        default: "https://www.instagram.com/sachin_kumar_0703/?hl=en"
    }
});

module.exports = {
    Intro : mongoose.model("intros" ,introSchema),
    About : mongoose.model("abouts" ,aboutSchema),
    Experience : mongoose.model("experiences",experienceSchema),
    Project : mongoose.model("projects" ,projectsSchema),
    Education : mongoose.model("educations",educationSchema),
    Contact : mongoose.model("contacts" ,contactSchema),
}