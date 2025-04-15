import { configureStore } from "@reduxjs/toolkit";
import { MenuAPI } from "./apiconstants";
import  menu from "../allslice/menuSlice";
import  qrcode from "../allslice/qrSlice";
import login from "../allslice/loginSlice";
import table from "../allslice/tableSlice";


export const store = configureStore({
  reducer : {
    login : login,
    menu: menu,
    qrcode : qrcode,
   table : table
  }
})