import { Product } from '../context/CartContext';
import product from "../photos/product2.jpg";
import crunchy from "../photos/product5.jpg";
import crunchy1 from "../photos/product6.jpg";
import crunchy2 from "../photos/crunchy1.jpg";
import product1 from "../photos/product5.jpg";
import product3 from "../photos/product3.jpg";
import product4 from "../photos/product4.jpg";
import creamy500g from "../photos/creamy(500g).jpg";
import creamy500g2 from "../photos/creamy(500g)2.jpg";
import crunchy500g from "../photos/crunchy(500g).jpg";
import crunchy500g2 from "../photos/crunchy(500g)2.jpg";
import crunchy500g3 from "../photos/crunchy(500g)3.jpg";




export const products: Product[] = [
  {
    id: "pb-classic-creamy",
    name: "Creamy Peanut Butter (500g)",
    description: "Smooth and creamy peanut butter, made from 100% roasted peanuts.",
    price: 270,
    image: creamy500g,
    gallery : [creamy500g2]
  },
  {
    id: "pb-classic-crunchy",
    name: " Crunchy Peanut Butter (500g)",
    description: "crunchy and tasty peanut butter, made from 100% roasted peanuts.",
    price: 270,
    image: crunchy500g,
    gallery : [crunchy500g2 , crunchy500g3]
  },
  {
    id: "pb-classic-creamy(1kg)",
    name: "Creamy Peanut Butter (1 Kg)",
    description: "Smooth and creamy peanut butter, made from 100% roasted peanuts.",
    price: 450,
    image: product,
    gallery : [ product3 , product4]
  },
  {
    id: "pb-classic-crunchy(1kg)",
    name: " Crunchy Peanut Butter (1 Kg)",
    description: "crunchy and tasty peanut butter, made from 100% roasted peanuts.",
    price: 450,
    image: crunchy,
    gallery: [product1 ,crunchy1 ,crunchy2 ]
  },
  // {
  //   id: "pb-dryfood-powder",
  //   name: "Dry-Food Powder",
  //   description: "We've used purified DryFoods In It.",
  //   price: 465,
  //   image: "https://images.unsplash.com/photo-1625201478070-36ab4a7c51c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  // },
  // {
  //   id: "pb-Ladoo",
  //   name: "Peanut Ladoo",
  //   description: "crunchy and tasty peanut ladoo, made from 100% roasted peanuts.",
  //   price: 465,
  //   image: "https://images.unsplash.com/photo-1625201478070-36ab4a7c51c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  // }
];