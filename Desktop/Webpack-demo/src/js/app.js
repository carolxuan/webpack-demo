import "../scss/index.scss";
// import "../image/christina-wocintechchat-com-68c8TlX5dfk-unsplash.jpg";
// import "@babel/polyfill";
// import $ from 'jquery';
// import Add from "./tool.js";
import axios from "axios";

// let arr = [1, 2, 3];
// arr.map(item => "a" + item);

// console.log(Add(5, 5));

axios.get('/vsweb/api/GetLstDicCinema').then(res => {
  console.log(res);
})
