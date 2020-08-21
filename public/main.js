console.log("main.js körs")

var todoItems = [];

async function update() {
    console.log(this.todoItems)
    this.todoItems = await fetch('http://127.0.0.1:3000/all').then((resp) => resp.json())
    console.log(this.todoItems)
    for (i = 0; i < todoItems.length; i++){
        $('#list').append("<div class='card w-75', id='container"+ i +"'></div>")
        $('#container' + i).append("<div class='card-body', id='body"+ i +"'></div>")
        $('#body' + i).append("<h5 class='card-title'>"+ todoItems[i].title +"</h5>")
        $('#body' + i).append("<p class='card-text'>"+ todoItems[i].content +"</p>")
        $('#list').append("<br>")
    }
    
}

update()
