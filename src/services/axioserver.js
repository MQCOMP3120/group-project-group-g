import axios from 'axios'

//const baseURL = "/"
const baseURL = "http://localhost:8102/"
//const baseURL = "https://comp3120-chat.herokuapp.com/"
const APIBrandsUrl = "api/brands/"
const APIProductsUrl = "api/products/"
const APIWishListUrl = "api/wishlists/"
const APICartUrl = "api/carts/"
const APICartUserUrl = "api/cartsuser/"


const postReg=(newObject) => {
    return axios.post(baseURL+'auth/register', newObject)
                .then(response => response.data)
}

const getAuth=(newObject) => {
    return axios.post(baseURL+'auth/login', newObject)
                .then(response => response.data)
}
//##########################################################
const getBrands=(token) => {
    return axios.get(baseURL+ APIBrandsUrl,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const getBrand=(token, id) => {
    return axios.get(baseURL+ APIBrandsUrl + id,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const postBrand=(token, newObject) => {
    return axios.post(baseURL+ APIBrandsUrl, newObject,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const putBrand=(token, id, newObject) => {
    return axios.put(baseURL+ APIBrandsUrl + id, newObject,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const delBrand=(token, id) => {
    return axios.delete(baseURL+ APIBrandsUrl + id, 
                        {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const delBrands=(token) => {
    return axios.delete(baseURL+ APIBrandsUrl, 
                        {headers: {'Authorization': token},},)
            .then(response => response.data)
}

//##########################################################

const getProducts=(token) => {
    return axios.get(baseURL+ APIProductsUrl,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const getProduct=(token, id) => {
    return axios.get(baseURL+ APIProductsUrl + id,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const postProduct=(token, newObject) => {
    return axios.post(baseURL+ APIProductsUrl, newObject,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const putProduct=(token, id, newObject) => {
    return axios.put(baseURL+ APIProductsUrl + id, newObject,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const delProduct=(token, id) => {
    return axios.delete(baseURL+ APIProductsUrl + id, 
                        {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const delProducts=(token) => {
    return axios.delete(baseURL+ APIProductsUrl, 
                        {headers: {'Authorization': token},},)
            .then(response => response.data)
}

//##########################################################

const getCarts=(token) => {
    return axios.get(baseURL+ APICartUrl,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const getCart=(token, id) => {
    return axios.get(baseURL+ APICartUrl + id,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const getCartUser=(token) => {
    return axios.get(baseURL+ APICartUserUrl,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const postCart=(token, newObject) => {
    return axios.post(baseURL+ APICartUrl, newObject,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const putCart=(token, id, newObject) => {
    return axios.put(baseURL+ APICartUrl + id, newObject,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const delCart=(token, id) => {
    return axios.delete(baseURL+ APICartUrl + id, 
                        {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const delCarts=(token) => {
    return axios.delete(baseURL+ APICartUrl, 
                        {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const payCart=(token, id, newObject) => {
    return axios.patch(baseURL+ APICartUrl + id, newObject,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}
//##########################################################

const getWishLists=(token) => {
    return axios.get(baseURL+ APIWishListUrl,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const postWishList=(token, newObject) => {
    return axios.post(baseURL+ APIWishListUrl, newObject,
                    {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const delWishList=(token, id) => {
    return axios.delete(baseURL+ APIWishListUrl + id, 
                        {headers: {'Authorization': token},},)
            .then(response => response.data)
}

const delWishLists=(token) => {
    return axios.delete(baseURL+ APIWishListUrl, 
                        {headers: {'Authorization': token},},)
            .then(response => response.data)
}

//##########################################################

// eslint-disable-next-line
export default {postReg, getAuth, 
    getBrands, getBrand, postBrand, putBrand, delBrand, delBrands,
    getProducts, getProduct, postProduct, putProduct, delProduct, delProducts,
    getCarts, getCart, getCartUser, postCart, putCart, delCart, delCarts, payCart,
    getWishLists, postWishList, delWishList, delWishLists,
}