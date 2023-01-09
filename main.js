let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let title = document.getElementById("title");
let submit = document.getElementById("submit");
let mode = "create";
let tmp;
let searchI = document.getElementById("search");
function addFunction() {
    if (price.value !== "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green"
    } else {
        total.style.backgroundColor = `#8d0f34`
        total.innerHTML = ""
    }
};
let dataJ;
if (localStorage.product != null) {
    dataJ = JSON.parse(localStorage.product);
} else {
    dataJ = [];
}
submit.onclick = function () {
    let newOb = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value,
    }
    if (title.value !== "" && category.value !== "" && price.value !== "") {
        if (mode === "create") {
            if (newOb.count > 1 && newOb.count <= 100) {
                for (let i = 0; i < newOb.count; i++) {
                    dataJ.push(newOb)
                }
            } else if (newOb.count === "") {
                dataJ.push(newOb)
            } else {
                
            }
        } else {
            dataJ[tmp] = newOb;
            count.style.display = "block"
            mode = "create"
            submit.innerHTML = "create"
        }
    
        localStorage.setItem("product", JSON.stringify(dataJ));
        console.log(dataJ);
        clearData();
        readData()
    }


}

readData()


function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    category.value = "";
    count.value = "";
    total.style.backgroundColor = `#8d0f34`
};



function readData() {
    let table = "";
    if (dataJ.length === 0) {
        document.getElementById("tbody").innerHTML = ``;
    }

    for (let i = 0; i < dataJ.length; i++) {
        table += `
        <tr>
        <th>${i + 1}</th>
        <th>${dataJ[i].title}</th>
        <th>${dataJ[i].price}</th>
        <th>${dataJ[i].taxes}</th>
        <th>${dataJ[i].ads}</th>
        <th>${dataJ[i].discount}</th>
        <th>${dataJ[i].total}</th>
        <th>${dataJ[i].category}</th>
        <td><button onclick="updateData(${i})" class="btn">update</button></td>
        <td><button onclick="deleteData(${i})" class="btn">delete</button></td>

    </tr>
        `
        document.getElementById("tbody").innerHTML = table;
    }






    let deleteAll = document.getElementById("deleteAll");
    if (dataJ.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAll()" class="btn1">delete All (${dataJ.length})</button>

        `
    } else {
        deleteAll.innerHTML = ``
    }
}


function deleteData(i) {
    dataJ.splice(i, 1);
    localStorage.product = JSON.stringify(dataJ);
    readData();
}

function deleteAll() {
    localStorage.clear();
    dataJ.splice(0);
    readData();
}

readData();


function updateData(i) {
    title.value = dataJ[i].title
    price.value = dataJ[i].price
    taxes.value = dataJ[i].taxes
    ads.value = dataJ[i].ads
    discount.value = dataJ[i].discount
    category.value = dataJ[i].category
    count.style.display = "none"
    submit.innerHTML = `Update`
    addFunction()
    mode = "update"
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
};









let search = "title";



function searchData(id) {
    if (id === "searchTitle") {
        search = "title"
        searchI.placeholder = "Search By Title"
    } else {
        search = "category"
        searchI.placeholder = "Search By category"
    }
    searchI.focus();
    searchI.value = "";
    readData();
}

function dataSearch(value) {
    let table = "";
    if (search === "title") {
        for (let i = 0; i < dataJ.length; i++) {
            if(dataJ[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <th>${i + 1}</th>
                <th>${dataJ[i].title}</th>
                <th>${dataJ[i].price}</th>
                <th>${dataJ[i].taxes}</th>
                <th>${dataJ[i].ads}</th>
                <th>${dataJ[i].discount}</th>
                <th>${dataJ[i].total}</th>
                <th>${dataJ[i].category}</th>
                <td><button onclick="updateData(${i})" class="btn">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn">delete</button></td>
            </tr>
                `
            }
        }
    } else {
        for (let i = 0; i < dataJ.length; i++) {
            if(dataJ[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                <th>${i + 1}</th>
                <th>${dataJ[i].title}</th>
                <th>${dataJ[i].price}</th>
                <th>${dataJ[i].taxes}</th>
                <th>${dataJ[i].ads}</th>
                <th>${dataJ[i].discount}</th>
                <th>${dataJ[i].total}</th>
                <th>${dataJ[i].category}</th>
                <td><button onclick="updateData(${i})" class="btn">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn">delete</button></td>
            </tr>
                `
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}