import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";
import { title } from "process";

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."; 
const posts = [];
const newpost=[];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home", {
        homeStart: homeStartingContent,
        posts: posts
    });
});
app.get("/home", function (req, res) {
    res.render("home", {
        homeStart: homeStartingContent,
        posts: posts
    });
});
app.get("/signin",(req,res)=>{
    res.render("signin.ejs")
    });

app.get("/post",(req,res)=>{
    res.render("post.ejs")
    });

app.post("/compose", function (req, res) {
        let post = {
            title: req.body.postTitle,
            content: req.body.postContent
        };
        
        posts.push(post);
        res.redirect("/");
    });
    
app.post("/composeagain", function (req, res) {
    const title=req.body.postTitle;
    const content=req.body.postContent;
    for(let i=0;i<posts.length;i++){
     if(posts[i].title===title){
        posts[i].content=content;
         break;
     }
     
    }
        res.redirect("/");
    });
    
app.get("/edited", function (req, res) {
        posts.forEach(function(post, postIndex) {
                res.render("EDITYOURBLOG.ejs", {
                    posts: posts,
                    postIndex: postIndex,
                });
    })});


app.post("/edited",(req,res)=>{
    let post = {
        title: req.body.postTitle,
        content: req.body.postContent
    };
    
    posts.push(post);
    res.redirect("/");}
);

app.post("/delete",(req,res)=>{
   const title=req.body.postTitle;
   for(let i=0;i<posts.length;i++){
    if(posts[i].title===title){
        posts.splice(i,1);
        break;
    }
    
   }
    res.redirect("/");
});

app.get("/posts/:post", function (req, res) {
    posts.forEach(function(post, postIndex) {
        const paramPostTitle = _.lowerCase(req.params.post);
        const postTitle = _.lowerCase(post.title);
        if (paramPostTitle === postTitle) {
            res.render("postsee.ejs", {
                posts: posts,
                postIndex: postIndex,
            });
        }
    })
});




app.listen(9000, () => {
        console.log(`Listening on port 9000`);
    });