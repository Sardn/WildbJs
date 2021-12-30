const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link')
    const more = document.querySelector('.more')
    // console.log(more);
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

    const getData = (value, category) => {
        fetch('/db/db.json')
            .then((res) => res.json())
            .then((data) => {
                const array = category ? data.filter((item) => item[category] === value) : data
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

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault()
            const linkValue = link.textContent
            const category = link.dataset.field
            getData(linkValue, category)
        })
    })
    // - При получении данных от сервера сохранять data в localstorage. Использовать метод JSON.stringify при сохранении данных.
    // localStorage.setItem('goods', JSON.stringify([1, 2, 3, 4, 5]))
    // const goods =  JSON.parse(localStorage.getItem('goods'));
    // console.log(goods);
    // console.log(localStorage);
    // localStorage.removeItem('goods')
    // console.log(localStorage);
    if (localStorage.getItem('goods') && window.location.pathname === "/goods.html") {
        renderGoods(JSON.parse(localStorage.getItem('goods')))
    }
    if (more) {
        more.addEventListener('click', () => {
            event.preventDefault()
            
            getData()

        })
    }
}
getGoods()




/*                                             Получение данных с сервера
получим наши первые данные с сервера.Сервер будет заменять файл db.json. структура которую будем получать опр-м методом и взимодействовать с ней
он создан для примера потому что с локальным файлом мб ошибки
метод fetch необходим чтобы получить данные от сервера в него первым делом необходимо получить урл запроса по которому хотим получить данные
так как работаем локально то необходимо передать путь к этому файлу
нетворк- дб.джейсон- (эта вкладочка фиксирует каждый запрос на сервер ее раскрыть и посмотреть что происходило)
реквест урл- строка с нашим запросом. метод- гет чз него получаем данные. статус- 200й, означает что все данные получены верно. 404 ошибка
означает что прописан неправильно путь
Превью- в этой вкладке находятся данные которые возвращаются от сервера. с ними необходимо что либо сделать- положить в переменную либо отправить
в функцию в виде аргумента
then- метод. он продлевает цепочку фетч. данная функция получит определенный респонс- ответ от сервера подтерждает то что запрос прошел успешно
 return response.json- вернуть респонс к которому применим метод джейсон. далее используем еще один метод вем- который тоже бужет получать
 функцию. 2я функция будет получать некий объект- дата- чз нее видим все те данные, которые пришли от сервера
 метод фетч обратился к файлу дбджейсон и вернул ответ только не сразу а чз какоето время. оно зависит от оч многих фвкторов- скорость интернета
 от количества данных, их могло быть больше и поступали бы тоже намного дольше. метод вен отрабатывает именно тогда когла данные от сервера
 пришли когда ответ уже получен точно знаем что пришел. сразу отработает после получения ответа. ответ будет в виде объекта респонс. чтобы
 из него извлечь дату используем метод джейсон возвращает объект к которому применили метод джейсон. следующая цепочка зен отработает тогда
 когда будут приведены в приятный читаемый вид. 2я цепочка также отработает чз определенное время оно будет варироваться от количества данных
 и в параметр дата поапаедт тот ответ сервера который нам и вернет а именно массив с данными
                                                    -Application-
                                                    Local storage. Session storage
  2 контейнера на стороне пользователя которые можем использовать для храненя информации. каждый клиент будет заходить на страницу с разных
  браузеров. в каждом браузере присутствует 2 контейнера- сешн сторидж будет существовть пока вкладка не закрыта. локал сторидж присутствует
  пока не будет удален. там будут хранится данные которые будем извлекать
  localStorage        обращаемся к глобальному объекту локалсторидж у него есть несколько полезных методов- для записи,   чтения и удаления
setItem() -он для записи используются круглые собки. должны передать 2 аргумента- кей и вэлью. название и значение и то и другое должно быть
строкой. чтобы перевести объект в строку есть глобальный объект джейсон у него есть метод стрингифай и в этот метод нужно передать тот объект
который и хотим сохранить
localStorage.setItem('goods', JSON.stringify([1, 2, 3, 4, 5]))- также можно сохранить и массив
теперь используем гет айтем
запустим в локал сторидж- чз джейсон передается в виде строки. но надо сдлеать чз метод парс то есть спарсить массив
console.log(JSON.parse(localStorage.getItem('goods')));
далее занесем его в переменную и в консоли выведет нам в виде массива - const goods =  JSON.parse(localStorage.getItem('goods'));
также есть метод удаления ремув- localStorage.removeItem('goods')


                                              Вывод данных на страницу Фильтрация Поиск
                                              Filter
точно также работает как форыч. вызывает колбек а он в свою очредь определенные элементы/ он возвращкает в массив только те элементы колбек
которых вернет тру. проверяем айтем гендер и сравниваем созначением вуменс- return item.gender === 'Womens' и в массив попадут только те
локументы гендкр которых равен вуменс
 const array =category ? data.filter((item) => item[category] === value) : data таким образом отфильтровываем полученный массив этот метод
 называется тернарный оператор

*/