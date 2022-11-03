import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axioserver from './services/axioserver'
import {
  useNavigate,
} from "react-router-dom"
import jsonData from'./services/sample.json'


function Stage({fn, keyWords}) {
    // values for conversations and new conversation
    const [brands, setBrands] =  useState([])
    const [products, setProducts] = useState([])
    const [wishLists, setWishLists] = useState([])
    const [carts, setCarts] = useState([])
    const navigate = useNavigate()

//####################################
// load local cookie when page load
useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedChatAppUserToken')
    if (loggedUserJSON) {
      let user = JSON.parse(loggedUserJSON)
      fn(user)
    }
  }, [])
// update cookie when values are changed        
useEffect(() => {
    if(keyWords.username){
        window.localStorage.setItem(
            'loggedChatAppUserToken', JSON.stringify(keyWords)
        )
    }
}, [keyWords])



//####################################

async function httpGetBrands(){
    // if(keyWords.jwt){
    //     axioserver.getBrands(keyWords.jwt)
    //     .then(response =>
    //     {console.log("httpGetBrands res:\n", response)
    //         if(response.error){
    //             alert("invalid")
    //             return
    //         }
    //         setBrands(response)
    //     })
    //     .catch( (error) =>
    //         alert(`httpGetConversation respond:${error}`)
    //     )
    // }
    try{
        const response = await axioserver.getBrands(keyWords.jwt)
        console.log("httpGetBrands res:\n", response)
        if(response.error){
            alert("invalid")
            setBrands([])
        }
        setBrands(response)
    } catch(error){
        alert(`httpGetConversation respond:${error}`)
    }
}

async function httpGetProducts(){
    // if(keyWords.jwt){
    //     axioserver.getProducts(keyWords.jwt)
    //     .then(response =>
    //     {console.log("httpGetProducts res:\n", response)
    //         if(response.error){
    //             alert("invalid")
    //             return
    //         }
    //         setProducts(response)
    //     })
    //     .catch( (error) =>
    //         alert(`httpGetConversation respond:${error}`)
    //     )
    // }
    try{
        const response = await axioserver.getProducts(keyWords.jwt)
        console.log("httpGetProducts res:\n", response)
        if(response.error){
            alert("invalid")
            setProducts([])
        }
        setProducts(response)
    } catch(error){
        alert(`httpGetConversation respond:${error}`)
    }
}

function httpGetWishLists(){
    if(keyWords.jwt){
        axioserver.getWishLists(keyWords.jwt)
        .then(response =>
        {console.log("httpGetWishLists res:\n", response)
            if(response.error){
                alert("invalid")
                setWishLists([])
            }
            setWishLists(response)
        })
        .catch( (error) =>
            alert(`httpGetConversation respond:${error}`)
        )
    }
}

function httpGetCarts(){
    if(keyWords.jwt){
        axioserver.getCarts(keyWords.jwt)
        .then(response =>
        {console.log("httpGetCarts res:\n", response)
            if(response.error){
                alert("invalid")
                setCarts([])
            }
            setCarts(response)
        })
        .catch( (error) =>
            alert(`httpGetConversation respond:${error}`)
        )
    }
}

//####################################
    // button components
    function sleep(ms){
        return new Promise((resolve)=>
        setTimeout(resolve, ms)
        )
    }

    async function delAll(){
        await axioserver.delWishLists(keyWords.jwt)
        await axioserver.delCarts(keyWords.jwt)
        await axioserver.delProducts(keyWords.jwt)
        await axioserver.delBrands(keyWords.jwt)
        alert("Del ALL")
    }
    async function initBrands(){
        const rawdata = jsonData
        //console.log(rawdata);

        rawdata.Brands.map( async brand =>{
            let response = await axioserver.postBrand(keyWords.jwt, {title : brand.title})
            //console.log(response);
        })
        await sleep(1000)
        await httpGetBrands()
    }
    async function initProducts(){
        const rawdata = jsonData
        //console.log(rawdata);

        rawdata.Products.map( async product =>{
            let brand = brands.find(item => item.title === product.brand)
            //console.log("brandid:", brand.id, brand.title);
            let temp ={...product, brandId: brand.id}
            //delete temp["brand"]
            //console.log(temp);
            await axioserver.postProduct(keyWords.jwt, temp)
        })
        await sleep(1000)
        await httpGetProducts()
    }


    // logout button
    function logOut(){
        window.localStorage.removeItem('loggedChatAppUserToken')
        fn({"homeState": "init",
            "username": "",
            "jwt": "",
            "userId": "",})
        navigate('/')
    }

    const stripeCheckout = (event) => {
        event.preventDefault()
        fetch("http://localhost:8102/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Send along all the information about the items
          body: JSON.stringify({
            items: [
              {
                id: 1,
                quantity: 2,
              },
              {
                id: 2,
                quantity: 1,
              },
            ],
          }),
        })
          .then(res => {
            if (res.ok) return res.json()
            // If there is an error then make sure we catch that
            return res.json().then(e => Promise.reject(e))
          })
          .then(({ url }) => {
            // On success redirect the customer to the returned URL
            //console.log(url)
            window.location = url
          })
          .catch(e => {
            console.error(e.error)
          })
      }
//####################################
    return (
        <div className="stagePage">
            <button onClick={httpGetBrands}> Get Brands </button>
            <div>
                {brands.length>0 && brands.map( brand =>
                <div key={brand.id} className="brandItem">
                    id:{brand.id} title:{brand.title} product count:{brand.products}
                </div>)}
            </div>

            <button onClick={httpGetProducts}> Get Products </button>
            <div>
                {products.length>0 && products.map( product =>
                    <div key={product.id} className="brandItem">
                        id:{product.id}--title:{product.title}--price:{product.price}--brandId:{product.brandId}--brand:{product.brand}
                        --rating:{product.rating}
                        {/* --timestamp:{product.timestamp}
                        --description:{product.description} */}
                        <img src= {product.image} width="100" height="100"/>
                        <img src= {product.image2} width="100" height="100"/>
                        <img src= {product.image3} width="100" height="100"/>
                    </div>)}
            </div>

            <button onClick={httpGetWishLists}> Get WishLists </button>
            <div>
                {wishLists.length>0 && wishLists.map( wishList =>
                <div key={wishList.productId} className="brandItem">
                    productId:{wishList.productId}
                </div>)}
            </div>

            <button onClick={httpGetCarts}> Get Carts </button>
            <div>
                {carts.length>0 && carts.map( cart =>
                <div key={cart.id} className="brandItem">
                    id:{cart.id}--userId:{cart.userId}--timestamp:{cart.timestamp}--paid:{cart.paid}
                    {cart.products.map( product =>
                    <div key={product.productId} className="brandItem">
                        productId:{product.productId}--quantity:{product.quantity}
                    </div>)}
                </div>)}
            </div>


            
            <button onClick={delAll}> Del All </button>
            <button onClick={initBrands}> Init Brands </button>
            <button onClick={initProducts}> Init Products </button>
            <button onClick={stripeCheckout}> Stripe </button>
            <button onClick={logOut}> Logout </button>

        </div>
        )
}

export default Stage