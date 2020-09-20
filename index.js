class Select {
  constructor(selectorMain, selectorChild, label, url) {
    this.selectorMain = document.getElementById(selectorMain) // Потому что quesrySelector больше ресурсов потребляет
    this.selectorChild = document.getElementById(selectorChild)
    this.label = label
    this.url = url

    this.selectorMain.insertAdjacentHTML('afterbegin', `<div class="containerTitle"><p class="titleSelectorMain">${this.label}</p><p class="item"></p><i class="material-icons icon up">arrow_drop_down</i></div><hr class="line"><ul class="list"></ul>`)
    this.selectorMain.classList.add('selectorMain')
    const list = document.querySelector('.list')
    const containerTitle = document.querySelector('.containerTitle')

    containerTitle.addEventListener('click', () => {
      this.select(this.selectorMain, containerTitle)
    })

    this.selectorChild.addEventListener('click', (event) => {
      if (event.target.tagName !== 'BUTTON') {
        return
      } else {
        this.caseTask(event.target.dataset.type)
      }
    })
    
    list.addEventListener('click', event => {
      if (event.target.tagName === 'UL') {
        return
      } else {
        this.getItem(event.target.dataset.id, containerTitle)
      }
    })
    
    const arr = []
    this.getData(this.url, list)
  }

  caseTask(el) {
    console.log(el)
    const containerTitle = document.querySelector('.containerTitle')
    const list = document.querySelector('.list')
    switch(el) {
      case 'open': 
        this.open(this.selectorMain, containerTitle)
        break
      case 'close':
        this.close(this.selectorMain, containerTitle)
        break
      case 'set':
        const index = list.children[5].dataset.id
        containerTitle.firstChild.classList.add('up')
        containerTitle.children[1].innerText = index
    }
  }

  select(main, title) {
    if (main.classList.contains('open')) {
      this.close(main, title)
    } else {
      this.open(main, title)
    }
  }

  open(main, title) {
    main.classList.add('open')
    title.firstChild.classList.add('up')
  }

  close(main) {
    main.classList.remove('open')
  }

  set() {

  }

  getItem(el, parent) {
    parent.children[1].innerText = el
  }

  async getData(url, list) {
    let arri = []
    let data = await fetch(url)
    data = await data.json()
    const ari = Object.values(data)
    const element = Object.values(data).map(item => {
      return `<li data-id="${item.label}">${item.label}</li>`
    }).join(' ')
    list.insertAdjacentHTML('afterbegin', element)
    console.log(ari)
  }

}

const select = new Select(
  'select',
  'actions',
  'Выберите технологию',
  'https://vladilen-dev.firebaseio.com/technologies.json'
)
