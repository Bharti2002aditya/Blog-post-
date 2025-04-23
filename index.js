const express = require('express')
const path = require('path');
const methodOverride = require('method-override')
const app = express()

const port = 3000

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory


let posts =[
    {
        id : "1a",
        username : "aditya",
        Comment: "Good morning",
    },
    {
        id : "2b",

        username : "Arjun",
        Comment: "Good morning",
    },
    {
        id : "3c",

        username : "Karan",
        Comment: "Good morning",
    }
] 
app.get('/posts', (req, res) => {
  res.render("index.ejs", {posts})
}) 

// create 
app.get('/posts/new', (req, res) => {
   res.render("new.ejs")
  })
  app.post('/posts', (req, res) => {
   let {username, Comment} = req.body;
   posts.push({username,Comment})
//    res.redirect("index.ejs");
res.render("index.ejs", {posts})

})
// read
app.get('/posts/:id', (req, res) => {
    let { id }= req.params;
    let post = posts.find((p) => id===p.id);
 
    res.render("show.ejs", {post});
   })


   // Update

   app.patch('/posts/:id',(req, res) =>{
    let { id }= req.params;
    let newComment = req.body.Comment;
    let post = posts.find((p) => id===p.id);
    post.Comment = newComment ;

    console.log(post)
    res.redirect("/posts")
   }
)

app.get('/posts/:id/edit', (req, res) => {
    let { id }= req.params;
    let post = posts.find((p) => id === p.id);
 
    res.render("edit.ejs", {post});
   })

//    delete
   app.delete('/posts/:id/', (req, res) => {
    let { id }= req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
   })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})