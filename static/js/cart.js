var updateBtns = document.getElementsByClassName('update-cart') 

for (i = 0; i < updateBtns.length; i++) {
  updateBtns[i].addEventListener('click', function(){
    var productId = this.dataset.product
    var action = this.dataset.action
    console.log('productId:', productId, 'action:', action)

    console.log('USER:', user)
    if (user == 'AnonymousUser'){
      // console.log('User is not authenticated')
      addCookieItem(productId, action)
    }else{
      console.log('User is authenticated')
      updateUserOrder(productId, action)
    }
  })
}

function addCookieItem(productId, action){
  console.log('User not auth')

  if (action == 'add'){
    if (cart[productId] == undefined){
      cart[productId] = {'quantity':1}
    }else{
      cart[productId]['quantity'] += 1
    }
  }

  if (action == 'remove'){
    if (cart[productId]['quantity'] > 1){ 
      cart[productId]['quantity'] -= 1
    }else{
      delete cart[productId]
    }
  }

  console.log('CART:', cart)
  document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
  location.reload()
}

function updateUserOrder(productId, action){
  console.log('User is authenticated, sending data...')

  var url = '/update_item/'

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },    
    body: JSON.stringify({'productId': productId, 'action': action})
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    location.reload()
    console.log('data:', data)
  })
}