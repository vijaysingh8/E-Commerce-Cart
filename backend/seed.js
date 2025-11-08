import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/connectDB.js";
import Product from "./models/product.model.js";

connectDB();

const products = [
  { name: "T-Shirt", price: 499, image: "https://cdn.pixabay.com/photo/2023/05/06/01/33/t-shirt-7973394_1280.jpg" },
  { name: "Jeans", price: 1299, image: "https://tse2.mm.bing.net/th/id/OIP.zx1F3Pz9WS1iRkhQg2jJDwHaHa?pid=Api&P=0&h=220" },
  { name: "Shoes", price: 1999, image: "https://img.freepik.com/premium-photo/sports-shoe-hd-8k-wallpaper-stock-photographic-image_853645-41584.jpg" },
  { name: "Watch", price: 999, image: "https://tse2.mm.bing.net/th/id/OIP.GweEgr-JYX9wCLdxvFV7fwHaEK?pid=Api&P=0&h=220" },
  { name: "Bag", price: 799, image: "https://static.vecteezy.com/system/resources/previews/033/037/314/non_2x/fashionable-leather-bag-with-elegant-handle-modern-design-and-shiny-buckle-generated-by-ai-free-photo.jpg" },
  { name: "Perfume", price: 599, image: "https://png.pngtree.com/background/20230425/original/pngtree-perfume-bottle-plant-flower-fashion-photography-advertising-background-picture-image_2477436.jpg" },
  { name: "Hoodie", price: 1099, image: "https://tse3.mm.bing.net/th/id/OIP.0nymxkBjUrfu2VT0-W56BgHaJ4?pid=Api&P=0&h=220" },
  { name: "Laptop", price: 47999, image: "https://www.pixelstalk.net/wp-content/uploads/2016/05/Laptop-Wallpapers-HD-Free-Download-Images-1.jpg" },
  { name: "Mobile", price: 12999, image: "https://img.freepik.com/free-photo/creative-reels-composition_23-2149711507.jpg" }
];


const insertData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(" Products inserted successfully!");
    process.exit();
  } catch (error) {
    console.log(" Error inserting data:", error);
    process.exit(1);
  }
};

insertData();
