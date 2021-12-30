const search = function () {
    const input = document.querySelector('.search-block > input')//обратимся к классу и внутри него искать тег- инпут
    const searchBtn = document.querySelector('.search-block > button')// таким же образом получаем кнопку

    //input.addEventListener('input',  // далее на инпут обработчик события оно ловит ввод каждое поле ввода
    //(event) => событие инпут отрабатывает при каждом вводе нового символа/ event- объект самого события в нем полное описание всего события
    //произошедшего. евент таргет будет хранить поле ввода на котором произошло событие. а у каждого ипута есть свойство вэлио, в котором хранится
    //все введенное в него значение. любое написанное каждый раз хранится  все значение поля ввода
    //В файле search.js вместо обработчика события на элементе input написать обработчик события click на кнопке и по этому событию 
    //выводить input.value в консоль     
    //console.log(event.target.value); 

    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list')

        goodsContainer.innerHTML = ""

        goods.forEach(good => {
            const goodBlock = document.createElement('div')

            goodBlock.classList.add('col-lg-3')
            goodBlock.classList.add('col-sm-6')
            goodBlock.innerHTML = `
                <div class="goods-card">
						<span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
						<img src="db/${good.img}" alt="${good.name}" class="goods-image">
						<h3 class="goods-title">${good.name}</h3>
						<p class="goods-description">${good.description}</p>
						<button class="button goods-card-btn add-to-cart" data-id="${good.id}">
							<span class="button-price">$${good.price}</span>
						</button>
					</div>
                    `

            goodsContainer.append(goodBlock)
        })
    }

    const getData = (value) => {
        fetch('/db/db.json')
            .then((res) => res.json())
            .then((data) => {
                const array = data.filter(good => good.name.includes(value))
                // .tolowerCase()

                /*
                if (category) {
                    console.log('есть');
                } else {
                    console.log('нет');
                }
                такую запись можно произвести чз тернарный оператор
                category ? console.log('есть') : console.log('нет');*/



                localStorage.setItem('goods', JSON.stringify(array))
                if (window.location.pathname !== "/goods.html") {
                    window.location.href = '/goods.html'
                } else {
                    renderGoods(array)
                }

            })
    }

    searchBtn.addEventListener('click', () => {
        console.log();
        getData(input.value)
    })
    // try {
    //     searchBtn.addEventListener('click', () => {
    //             console.log(input.value);
    //         })

    // } catch(e) {
    //     console.error('Уважаемый верстальщик, верните класс пожалуйста');
    // } таким образом поставили заглушку- то есть предупреждение
}

search()