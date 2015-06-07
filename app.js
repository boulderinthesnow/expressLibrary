var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"), // post
	methodOverride = require("method-override"); // post

var books = [],
	id = 1;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/", function(req, res) {
	res.render("index", {books:books});

})

app.post("/new", function(req, res) {
	var book = {};
	book.title = req.body.title;
	book.author = req.body.author;
	book.year = req.body.year;
	book.id = id;
	id++
	books.push(book);
	console.log(books);

	res.redirect("/");
})

app.get("/:id", function(req, res) {
	books.forEach(function(book){
		if (book.id === Number(req.params.id)) {
			res.render("show", {book:book})
		}
	})
})


app.get("/edit/:id", function(req, res) {
	books.forEach(function(book){
		if (book.id === Number(req.params.id)) {
			TempGlobalId = Number(req.params.id)
			res.render("edit", {id:req.params.id, book:book});
		}
	})
	
})

app.put("/putItOut", function(req, res) {
	books.forEach(function(book){
		if (book.id === TempGlobalId) {
			book.title = req.body.title
			book.author = req.body.author
			book.year = req.body.year
		}
	})
	res.redirect("/")
})

app.delete("/delete/:id", function(req, res) {
	books.forEach(function(book){
		if (book.id === Number(req.params.id)) {
			var index = books.indexOf(book)
			books.splice(index,1);
		}
	})
	res.redirect("/")
})





app.listen(3000, function(){
	console.log("It be servin' on port 3K yo")
})
