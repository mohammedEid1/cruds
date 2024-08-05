let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount")
let count = document.getElementById("count");
let category = document.getElementById("category");
let search = document.getElementById("search");
let titlesearch = document.getElementById("titlesearch");
let searchcategory = document.getElementById("searchcategory");
let submit = document.getElementById("submit");

let temp;

let mode = "create";

console.log(submit,title,price,tax,ads,discount,total,count,category,search,titlesearch,searchcategory)


// function total 

function gettotal(){
    if(price.value != ''){
        let result = ( +price.value + +tax.value + +ads.value  ) - +discount.value;
        total.innerHTML = result;
        total.style.background = "green";
    }else{
        total.innerHTML = '';
        total.style.background = "red";
    }
}

let datapro;

if (localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}



submit.onclick = function(){
    let mypro = {
        titile:title.value,
        price:price.value,
        tax:tax.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value

    };

    total.style.background = "red";

    

    
    if(mode === "create"){
        if(mypro.count > 1){
            for(let i = 0; i < mypro.count;i++){
                datapro.push(mypro);
            };
        }else{
            datapro.push(mypro);
        };
    }else{
        datapro[temp] = mypro;
        count.style.display = "block";
        mode = "create";
        submit.innerHTML = "إنشاء";

        
    }

    


    localStorage.setItem('product', JSON.stringify(datapro));
    showproduct();
    
    clear();
    
}





function clear() {
    title.value = '';
    price.value = '';
    tax.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
};




function showproduct(){
    let table = '' ;
    
    for(let i = 0; i < datapro.length ; i++){
        table +=  `
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].titile}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].tax}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick = "updatdata(${i})">تحديث</button></td>
        <td><button onclick = "deletproduct(${i})">حذف</button></td>
        </tr>
        `
        
    }
    
    
    document.getElementById('tbody').innerHTML = table;

    let btn = document.getElementById('deletall');
    
    
    if(datapro.length > 0){

        btn.innerHTML = `
        
        <button id="deletall"  onclick = "deletall()">حذف الكل (${datapro.length})</button>
        `
    }else{
        btn.innerHTML = "";
    }
};





showproduct();




function deletproduct(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showproduct();


};







console.log(datapro.length);



function deletall(){
    datapro.splice(0);
    localStorage.clear();
    showproduct();
    submit.innerHTML = "إنشاء";
}





function updatdata(i){
    title.value = datapro[i].titile;
    price.value = datapro[i].price;
    tax.value = datapro[i].tax;
    ads.value = datapro[i].ads;
    submit.innerHTML = "تحديث";
    count.style.display = "none";
    category.value = datapro[i].category;
    mode = "update";
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

let searchMood = 'title1';

function getsearchmode(id){
    if(id == 'titlesearch'){
        searchMood = 'title1';
        search.placeholder = 'بحث باستخدام اسم المنتج ';
        
    }else{
        searchMood = 'category1';
        search.placeholder = 'بحث باستخدام الصنف';

        
    }
    search.focus();
    console.log(searchMood)
    
}



function searchData(value){
    let table = '';
    if(searchMood == 'title1'){
        for( i = 0; i < datapro.length; i++ ){
            if(datapro[i].titile.includes(value)){
                table += `
                            <tr>
                            <td>${i+1}</td>
                            <td>${datapro[i].titile}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].tax}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick = "updatdata(${i})">تحديث</button></td>
                            <td><button onclick = "deletproduct(${i})">حذف</button></td>
                            </tr>`
                        }
                    }
                    
                    
                    
                }else{
        for( i = 0; i < datapro.length; i++ ){
            if(datapro[i].category.includes(value)){
                table += `
                            <tr>
                            <td>${i+1}</td>
                            <td>${datapro[i].titile}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].tax}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick = "updatdata(${i})">تحديث</button></td>
                            <td><button onclick = "deletproduct(${i})">حذف</button></td>
                            </tr>`
                        }
                        
                    }
                    
                }
                document.getElementById('tbody').innerHTML = table;
            
            }
            
            
            
            
            

            

            
            
            
















