const socketClient = io();


const input_button = document.querySelector("#input_button")

socketClient.on('product_list',(data)=>{
    console.log(data)

    const list = document.querySelector("#products_list")
    
    const products = `${data.map((product)=>`<li><p>title: ${product.title}</p> <p>description: ${product.description}</p> <p>code: ${product.code}</p> <p>price: ${product.price}</p> <p>stock: ${product.stock}</p> <p>category: ${product.category}</p>  </li>`)}`
    
    list.innerHTML = products
})

input_button.addEventListener('click',(e)=>{

    e.preventDefault()
    const form = document.querySelector("#product_form")
    const title = document.querySelector("#title")
    const description = document.querySelector("#description")
    const code = document.querySelector("#code")
    const stock = document.querySelector("#stock")
    const price = document.querySelector("#price")
    const category = document.querySelector("#category")

    const product ={
        title: title.value,
        description: description.value,
        code: code.value,
        stock: stock.value,
        price: price.value,
        category: category.value
    }

    socketClient.emit('product', product)
    form.reset()
})