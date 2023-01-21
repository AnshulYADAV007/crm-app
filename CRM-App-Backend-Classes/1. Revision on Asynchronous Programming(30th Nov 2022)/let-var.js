function getLowestPrice(item) {
    let count = item.inventory; // 3
    let price = item.price; // 3

    if(item.salePrice) { // 2
        let count = item.saleInventory // 0
        if(count > 0){
            price = item.salePrice // 2
        }
    }

    if (count > 0) { // 0
        return price; // 2
    }

    return 0;
}

const item = {
    inventory: 3,
    price : 3,
    salePrice: 2,
    saleInventory: 0
}

console.log(getLowestPrice(item))