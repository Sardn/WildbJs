const cart = function () {
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart')//найдем модальное окно в разметке. лучше его записать чз гетэлементбайайди, так как он будет
    // быстрее искать данный селектор так как он не ищет элемент по всей верстке а только по идентификатору. работает только в условиях документа
    const closeBtn = //искать будем не в самом документе а в cart( в самом модальном окне)внутри элемента используя при этом квериселектор
        cart.querySelector('.modal-close')
    const goodsContainer = document.querySelector('.long-goods-list')
    const cartTable = document.querySelector('.cart-table__goods')

    const deleteCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.filter(good => {
           return good.id !== id 
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }
    const plusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map(good => {
            if (good.id === id) {
                good.count++
            }
            return good
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }
    const minusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map(good => {
            if (good.id === id) {
                good.count--
            }
            return good
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }


    const addToCart = (id) => {
        const goods = JSON.parse(localStorage.getItem('goods'))
        const clickedGood = goods.find(good => good.id === id)
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

        if (cart.some(good => good.id === clickedGood.id)) {
            console.log('увеличить количество clickedGood');
            cart.map(good => {
                if (good.id === clickedGood.id) {
                    good.count++
                }
                return good
            })
        } else {
            clickedGood.count = 1
            cart.push(clickedGood)
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    cart.addEventListener('click', (event) => {
        if (!event.target.closest('.modal') && event.target
        .classlist.contains('overlay')) {
            cart.style.display = ''
        };
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cart.style.display = ''
        }
    })

    // console.log(cart);
    //метод квериселектор работает именно с селекторами, когда работаем по классам обязательно добавить точку, если по айди то решетку, если по 
    // тегу то символ ставить не надо
    // console.dir(cartBtn);// не чз лог а дир- таким образом получим элемент не в виде верстки, а в виде оъекта и сможем его раскрыть

    const renderCartGoods = (goods) => {
        cartTable.innerHTML = ''
        goods.forEach(good => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
            <td>${good.name}</td>
			<td>${good.price}$</td>
			<td><button class="cart-btn-minus"">-</button></td>
			<td>${good.count}</td>
			<td><button class=" cart-btn-plus"">+</button></td>
			<td>${+good.name * +good.count}$</td>
			<td><button class="cart-btn-delete"">x</button></td>
            `
            cartTable.append(tr)

            tr.addEventListener('click', (e) => {
        
                if (e.target.classlist.contains('cart-btn-minus')) {
                    minusCartItem(good.id);
                } else if (e.target.classlist.contains('cart-btn-plus')) {
                    plusCartItem(good.id);
                } else if (e.target.classlist.contains('cart-btn-delete')) {
                   deleteCartItem(good.id);

                }
            })
        })
    }

    cartBtn.addEventListener('click', function () {
        const cartArray = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []
        renderCartGoods(cartArray)

        cart.style.display = 'flex'
    })
    // далее повесим обработчик события по клику- возьмем его из класса выше только значение флекс заменим на нон. либо сделать значение пустым
    closeBtn.addEventListener('click', function () {
        cart.style.display = ''
    })
    if (goodsContainer) {
        goodsContainer.addEventListener('click', (event) => {
            if (event.target.closest('.add-to-cart')) {
                const buttonToCart = event.target.closest('.add-to-cart')
                const goodId = buttonToCart.dataset.id

                addToCart(goodId)


            }
        })
    }

}

//функция внутри функции создается для того чтобы названия переменных не совпадали во всем документе и не выходила ошибка
//такой подход называется инкапсуляцией завернули код внутрь функции который находится внутри фигурных скобок
// это делает код безопаснее и более читабельным
cart()

/*                                                      -Делегирование событий-
повесили обработчик события на сам контейнер. но получаем элемент в консоли будто кликаем по внутреннему наполнению контейнера. вся верстка
на странице находится в 2х мерном изображении по факту мы видим слои. и когда будем кликать по блоку внутри будем получать каждый блок
вешаем обработчик события на родительский блок и не важно сколько у этого блока дочерних элемнтов. при этом отслушивать клик на каждом дочернем
элементе
*/ 