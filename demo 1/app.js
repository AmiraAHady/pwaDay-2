import { openDB } from "https://cdn.jsdelivr.net/npm/idb@8/+esm";

// async function useDb() {
//   const dbpromise = await openDB("simple-database", 2, {
//     upgrade(db) {
//   if (!db.objectStoreNames.contains("user")) {
//     db.createObjectStore("user",{keyPath:'id',autoIncrement:true});
//   }
//       if (!db.objectStoreNames.contains("products")) {
//         db.createObjectStore("products",{keyPath:'proId'});
//       }
//     },
//   });
// }

// useDb();

async function addProduct() {
  const dbpromise = await openDB("ecommerce", 3, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("products")) {
        db.createObjectStore("products", { keyPath: "name" });
      }
    },
  });

  var tx = dbpromise.transaction("products", "readwrite");
  Promise.all([
    tx.store.add({
      id: 1,
      name: "product 1",
      price: 1000,
    }),
    tx.store.add({
      id: 2,
      name: "product 2",
      price: 1500,
    }),
  ]);
}

async function getProduct(){
    const dbpromise = await openDB("ecommerce", 3);
    var myProduct=await dbpromise.get('products',1)
    console.dir(myProduct)

}

async function getAllProduct(){
    const dbpromise = await openDB("ecommerce", 3);
    var allProducts=await dbpromise.getAll('products');
    console.dir(allProducts)

}

window.addProduct = addProduct;
window.getProduct = getProduct;
window.getAllProduct=getAllProduct;
