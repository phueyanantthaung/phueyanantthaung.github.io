$(document).ready(function(){
    getData ();
    function getData(){
        let shopString =localStorage.getItem('shops');
        if(shopString){
            let shopArray = JSON.parse(shopString);
            let data ='';
            let k=1;
            let total = 0;
            $.each(shopArray, function(i,v){
                data += `<tr>
                            <td>${k++}</td>
                            <td>${v.name}</td>
                            <td>${v.price}</td>
                            <td>
                                <button class="min"> - </button>
                                ${v.qty}
                                <button class="max"> + </button>
                            </td>
                            <td>${v.price* v.qty}</td>
                        </tr>`;
                        total += v.price * v.qty;
            })
            data += `<tr>
                        <td colspan="4">Total</td>
                        <td>${total}</td>
                    </tr>`;
                    console.log(data);
                    $('itemTbody').html(data);
        }
    }

    count();

    function count() {
        let shopString = localStorage.getItem('shops');
        if(shopString){
            let shopArray = JSON.parse(shopString);

            if(shopArray != null) {
                $('#count_item').text(shopArray.length);
            }
        }
    }
    
    $('.addToCart').click(function(){
        // alert('Hello');
        let id= $(this).data('id');
        let name= $(this).data('name');
        let price= $(this).data('price');
        // console.log(id,name,price);

        let shop_items ={
            id: id,
            name: name,
            price: price,
            qty: 1
        }
        // console.log(shop_items);

        let shopString = localStorage.getItem('shops');
        let shopArray;
        if(shopString == null){
            shopArray = [];
        }else {
            shopArray = JSON.parse(shopString);
        }

        // shopArray.push(shop_items);

        let status =false;
        $.each(shopArray,function(i,v){
            if(id == v.id){
                status = true;
                v.qty++;
            }
        })

        if(status == false){
            shopArray.push(shop_items);
        }
        
        let shopData =JSON.stringify(shopArray);
        localStorage.setItem('shops',shopData);

        count();
    })
})