import { useState, useEffect } from 'react'
import axioserver from './services/axioserver'

import {
  useNavigate,
} from "react-router-dom"

function Stage({fn, keyWords}) {
    // values for conversations and new conversation
    const [brands, setBrands] = useState()
    const [products, setProducts] = useState()
    const [wishLists, setWishLists] = useState()
    const [carts, setCarts] = useState()
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

function httpGetBrands(){
    if(keyWords.jwt){
        axioserver.getBrands(keyWords.jwt)
        .then(response =>
        {console.log("httpGetBrands res:\n", response)
            if(response.error){
                alert("invalid")
                return
            }
            setBrands(response)
        })
        .catch( (error) =>
            alert(`httpGetConversation respond:${error}`)
        )
    }
}

function httpGetProducts(){
    if(keyWords.jwt){
        axioserver.getProducts(keyWords.jwt)
        .then(response =>
        {console.log("httpGetProducts res:\n", response)
            if(response.error){
                alert("invalid")
                return
            }
            setProducts(response)
        })
        .catch( (error) =>
            alert(`httpGetConversation respond:${error}`)
        )
    }
}

function httpGetWishLists(){
    if(keyWords.jwt){
        axioserver.getWishLists(keyWords.jwt)
        .then(response =>
        {console.log("httpGetWishLists res:\n", response)
            if(response.error){
                alert("invalid")
                return
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
                return
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
    async function delAll(){
        await axioserver.delWishLists(keyWords.jwt)
        await axioserver.delCarts(keyWords.jwt)
        await axioserver.delProducts(keyWords.jwt)
        await axioserver.delBrands(keyWords.jwt)
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

//####################################
    return (
        <div className="stagePage">
            <button onClick={httpGetBrands}> Get Brands </button>
            <div>
                {brands && brands.map( brand =>
                <div key={brand.id} className="brandItem">
                    id:{brand.id} title:{brand.title} product count:{brand.products}
                </div>)}
            </div>

            <button onClick={httpGetProducts}> Get Products </button>
            <div>
                {products && products.map( product =>
                <div key={product.id} className="brandItem">
                    id:{product.id}--title:{product.title}--price:{product.price}--brandId:{product.brandId}--brand:{product.brand}
                    --rating:{product.rating}--timestamp:{product.timestamp}
                    --description:{product.description}--image:{product.image}
                </div>)}
            </div>

            <button onClick={httpGetWishLists}> Get WishLists </button>
            <div>
                {wishLists && wishLists.map( wishList =>
                <div key={wishList.productId} className="brandItem">
                    productId:{wishList.productId}
                </div>)}
            </div>

            <button onClick={httpGetCarts}> Get Carts </button>
            <div>
                {carts && carts.map( cart =>
                <div key={cart.id} className="brandItem">
                    id:{cart.id}--userId:{cart.userId}--timestamp:{cart.timestamp}--paid:{cart.paid}
                    {cart.products.map( product =>
                    <div key={product.productId} className="brandItem">
                        productId:{product.productId}--quantity:{product.quantity}
                    </div>)}
                </div>)}
            </div>


            
            <button onClick={delAll}> Del All </button>
            <button onClick={logOut}> Logout </button>

        </div>
        )
}

export default Stage