// import React, { useState } from "react";
// import { createItem } from "../utils/Item";
// import { CreateItemPayload } from "../types/types";

// function Item() {
//   // states
//   const [makeItem, setMakeItem] = useState<CreateItemPayload>({
//     nama: "",
//     qrcode: "",
//     price: 0,
//     supplier_id: "",
//     description: "",
//     discount: 0,
//     image: null,
//     category_id: "",
//   });

//   // form handlers
//   function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
//     const { value, name } = e.target;

//     setMakeItem((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function handleUploadImg(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];

//     if (file) {
//       setMakeItem((prev) => ({
//         ...prev,
//         image: file,
//       }));
//     }
//   }

//   return (
//     <div className="w-screen h-screen flex justify-center items-center">
//       <form
//         onSubmit={(e) => {
//           createItem(e, makeItem);
//         }}
//         className="rounded-md w-1/2 h-fit border flex flex-col gap-4 p-6"
//       >
//         <input onChange={handleInputs} type="text" value={makeItem?.nama} placeholder="Product Name" name="nama" />
//         <input onChange={handleInputs} type="text" placeholder="QR Code" name="qrcode" />
//         <input onChange={handleInputs} type="number" placeholder="Price" name="price" step={0.01} />
//         <input onChange={handleInputs} type="text" placeholder="Supplier ID" name="supplier_id" />
//         <input onChange={handleInputs} type="text" placeholder="Description" name="description" />
//         <input onChange={handleInputs} type="number" placeholder="Discount" name="discount" step={0.01} />
//         <input onChange={handleUploadImg} type="file" placeholder="Image" name="image_url" />
//         <input onChange={handleInputs} type="number" placeholder="Category ID" name="category_id" />

//         <button type="submit" className="font-semibold rounded-md p-3 text-white hover:cursor-pointer bg-zinc-800">
//           Create Item
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Item;
