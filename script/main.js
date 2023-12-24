const products = {
    cartier: {
        name: 'Cartier',
        count: 0,
        price: 1300000,
        sale: 0,
        categories: 'watch',
        like: false,
        img: 'img/cartier.png',
        get totalPrice(){
            return this.price * this.count
        }
    },
    audemars: {
        name: 'Audemars',
        count: 0,
        price: 1420000,
        sale: 15,
        like: false,
        categories: 'watch',
        img: 'img/audemars-p.png',
        get totalPrice(){
            return this.price * this.count
        }
    },
    thcs: {
        name: 'THCS',
        count: 0,
        price: 1120000,
        sale: 30,
        categories: 'watch',
        like: false,
        img: 'img/thcs.png',
        get totalPrice(){
            return this.price * this.count
        }
    },
    duchen: {
        name: 'Duchen',
        count: 0,
        price: 950000,
        sale: 10,
        categories: 'watch',
        like: false,
        img: 'img/l-duchen.png',
        get totalPrice(){
            return this.price * this.count
        }
    },
    rolex: {
        name: 'Rolex',
        count: 0,
        price: 2450000,
        sale: 0,
        categories: 'watch',
        like: false,
        img: 'img/rolex.png',
        get totalPrice(){
            return this.price * this.count
        }
    },
    spikes: {
        name: 'Spikes',
        count: 0,
        sale: 0,
        price: 1450000,
        categories: 'ring',
        like: false,
        img: 'img/spikes.png',
        get totalPrice(){
            return this.price * this.count
        }
    },
    pierrelannier: {
        name: 'PierreLannier',
        count: 0,
        sale: 50,
        price: 1280000,
        like: false,
        categories: 'watch',
        img: 'img/pierre-lannier.png',
        get totalPrice(){
            return this.price * this.count
        }
    },
    tiamo: {
        name: 'TIAMO',
        count: 0,
        sale: 20,
        price: 1000000,
        like: false,
        categories: 'ring',
        img: 'img/tiamo.png',
        get totalPrice(){
            return this.price * this.count
        }
    },
    thcs2: {
        name: 'THCS2',
        count: 0,
        sale: 30,
        price: 1120000,
        categories: 'watch',
        like: false,
        img: 'img/thcs2.png',
        get totalPrice(){
            return this.price * this.count
        }
    },
    montblanc: {
        name: 'Montblanc',
        count: 0,
        sale: 0,
        price: 845000,
        categories: 'bracelet',
        like: false,
        img: 'img/montblanc.png',
        get totalPrice(){
            return this.price * this.count
        }
    },
    jaeger: {
        name: 'Jaeger',
        count: 0,
        sale: 10,
        price: 2450000,
        categories: 'watch',
        like: false,
        img: 'img/jaeger-lecoultre.png',
        get totalPrice(){
            return this.price * this.count
        }
    },
    hockey: {
        name: 'HOCKEY',
        count: 0,
        sale: 0,
        price: 750000,
        like: false,
        categories: 'bracelet',
        img: 'img/hockey.png',
        get totalPrice(){
            return this.price * this.count
        }
    },
}

const navBtns = document.querySelectorAll('.header__nav-btn')
      shopBtns = document.querySelectorAll('.shop')
      shopBtnsIcon = document.querySelectorAll('.shop i')
      heartBtns = document.querySelectorAll('.heart')
      basketBtn = document.querySelector('.header__basket-count')
      basketBtnCount = document.querySelector('.header__basket-count')
      basketChecklist = document.querySelector('.basket__modal-checklist')
      totalPriceBasket = document.querySelector('.basket__modal-totalPrice')
      basketModal = document.querySelector('.basket__open')
      basketShop = document.querySelector('.basket')
      basketClose = document.querySelector('.basket__modal-btn')
      basketDelivery = document.querySelector('.basket__modal-bottom')
      savesBtn = document.querySelector('.saves__open')
      savesChecklist = document.querySelector('.saves__modal-checklist')
      savesModal = document.querySelector('.saves')
      savesClose = document.querySelector('.saves__modal-btn')
      savesBtnCount = document.querySelector('.header__saves-count')
      modalHeart = document.querySelector('.modal__heart')
      
      
shopBtns.forEach(shopBtn => {
    shopBtn.addEventListener('click', function() {
        plusOrMinus(this)
        for (let i = 0; i < shopBtnsIcon.length; i++) {
            
        }             
    })
});

heartBtns.forEach(heartBtn => {
    heartBtn.addEventListener('click', function () {
        
        saves(this)
    })
})

function saves(heart) {
    let parent = heart.closest('.products__card')
    parentId = parent.getAttribute('id')
    parentHeart = document.querySelector(`#${parentId} .heart i`)
    if (products[parentId].like == true) {
        products[parentId].like = false
    }else{
        products[parentId].like = true
    }
    
    parentHeart.animate([{
        scale: 1
        },
        {
            scale: 1.3
        }
    ], {
        direction: 'alternate',
        duration: 250,
        easing: 'ease-out'
    })
    
    
    savesBasket()
}

function savesBasket() {
    let saveProducts = []
    for (const key in products) {
        if (products[key].like) saveProducts.push(products[key])
    }
    savesChecklist.innerHTML = ''
    for (let i = 0; i < saveProducts.length; i++) {
        savesChecklist.innerHTML += cardItemSave(saveProducts[i])
    }
    
    for (let i = 0; i < heartBtns.length; i++) {
        let parent = heartBtns[i].closest('.products__card')
        parentId = parent.getAttribute('id')
        
        if (products[parentId].like) {
            heartBtns[i].classList.add('active')
        }else{
            heartBtns[i].classList.remove('active')
        }
    }
    
    const allCount = totalSavesCount()
    if (allCount) {
        savesBtnCount.classList.add('active')
    }else{
        savesBtnCount.classList.remove('active')
    }
    savesBtnCount.innerHTML = allCount
}

function totalSavesCount() {
    let total = 0
    for (const key in products) {
        if(products[key].like == true) total++
    }
    return total
}

function plusOrMinus(btn) {
    let parent = btn.closest('.products__card')
    parentId = parent.getAttribute('id')
    parentShop = document.querySelector(`#${parentId} .shop i`)
    
    products[parentId].count++
    basket()
    
    parentShop.animate([{
        scale: 1
        },
        {
            scale: 1.3,
            color: 'green'
        }
    ], {
        direction: 'alternate',
        duration: 250,
        easing: 'ease-out'
    })
} 



function basket() {
    const productsArray = []
    for (const key in products) {
        let totalCount = 0
        const po = products[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`)
        parentIndecator = productCard.querySelector('.products__card-count')
        
        
        if (po.count) {
            productsArray.push(po)
            basketBtnCount.classList.add('active')
            totalCount += po.count
            parentIndecator.classList.add('active')
            parentIndecator.innerHTML = po.count
        }else{
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    
    for (let i = 0; i < productsArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productsArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    }else{
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct() 
}

function totalSummProduct() {
    let total = 0
    for (const key in products) {
        total += products[key].totalPrice
    }
    return total + ' UZS'
}

function totalCountProduct() {
    let total = 0
    for (const key in products) {
        total += products[key].count 
    }
    return total
}

function cardItemSave(save) {
    const {name, price, img, like} = save
    return `
    <div class="basket__modal-product">
        <div class="basket__modal-info">
            <img class="basket__modal-productImage" src="${img}" alt="">
            <div class="basket__modal-infoSub">
                <p class="basket__modal-infoName">${name}</p>
                <p class="basket__modal-infoPrice">${price} UZS</p>
            </div>
        </div>
        <div class="basket__modal-option" id="${name.toLowerCase()}_card">
            <i class="fas fa-heart modal__heart"></i>
        </div>
    </div>
    `
}



function cardItemBurger(productsData){
    const {name, totalPrice: price, count, img} = productsData
    return `
    <div class="basket__modal-product">
        <div class="basket__modal-info">
            <img class="basket__modal-productImage" src="${img}" alt="">
            <div class="basket__modal-infoSub">
                <p class="basket__modal-infoName">${name}</p>
                <p class="basket__modal-infoPrice">${price} UZS</p>
            </div>
        </div>
        <div class="basket__modal-option" id="${name.toLowerCase()}_card">
            <button class="basket__modal-symbol" data-symbol="+">+</button>
            <button class="basket__modal-count">${count}</button>
            <button class="basket__modal-symbol" data-symbol="-">-</button>
        </div>
    </div>
    `
}

basketModal.addEventListener('click', () => {
    basketShop.classList.add('active')
})
basketClose.addEventListener('click', () => {
    basketShop.classList.remove('active')
})
savesBtn.addEventListener('click', () => {
    savesModal.classList.add('active')
})
savesClose.addEventListener('click', () => {
    savesModal.classList.remove('active')
})

window.addEventListener('click', function (e) {
    const btn = e.target
    if (btn.classList.contains('basket__modal-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.basket__modal-option')
        if (parent) {
            const idProduct = parent.getAttribute('id').split('_')[0]
            if (attr == '-') {
                products[idProduct].count--
            }else {
                products[idProduct].count++
            }
            basket()
        }
    }else if(btn.classList.contains('modal__heart')) {
        const parent = btn.closest('.basket__modal-option')
        if (parent) {
            const parentId = parent.getAttribute('id').split('_')[0]
            products[parentId].like = false
            savesBasket()
        }
    }
})

const navList = document.querySelector('.header__nav-list')
      burgerOpen = document.querySelector('.burger')
      burgerClose = document.querySelector('.header__nav-close')
      navLinks = document.querySelectorAll('.header__nav-link')
      
burgerOpen.addEventListener('click', function () {
    navList.classList.add('active')
})
burgerClose.addEventListener('click', function () {
    navList.classList.remove('active')
})
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function () {
        navList.classList.remove('active')
    })
}