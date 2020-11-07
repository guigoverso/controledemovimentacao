let movimentacao = []
let pedidoForaData = false
const meses = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

function aoCarregar() {
    getDiaAnterior()
    movimentacao = pegarPedidos()
    if(movimentacao.length)
        preencherFiltros(movimentacao)
}

function getDiaAnterior() {
    let movDate = document.getElementById('movDate')

    let date = new Date()
    date.setDate(date.getDate() - 1)

    const ano = date.getFullYear()
    const mes = date.getMonth() + 1
    const dia = date.getDate > 10 ? date.getDate() : '0' + date.getDate()

    movDate.value = `${ano}-${mes}-${dia}`
}

function organizarMovimentacao(movimentacao) {
    let novaArray = movimentacao

    novaArray.sort(function(a, b) {
        if(a.numero > b.numero) {
            return 1
        }
        if(a.numero < b.numero) {
            return -1
        }

        return 0
    })

    return novaArray
}

function preencherFiltros(movimentacao) {
    let filtroMes = document.getElementById('filtroMes')
    let filtroAno = document.getElementById('filtroAno')

    filtroMes.innerHTML = ''
    filtroAno.innerHTML = ''

    let optionTodos = criarTag('option', '----')
    optionTodos.value = ""

    filtroMes.appendChild(optionTodos)
    filtroAno.appendChild(optionTodos.cloneNode(true))

    let anosPreenchidos = []
    let mesesPreenchidos = []

    for(let pedido of movimentacao) {
       
        if(!mesesPreenchidos.length || !mesesPreenchidos.includes(pedido.mes)) {
            mesesPreenchidos.push(pedido.mes)
        }
        
        if(!anosPreenchidos.length || !anosPreenchidos.includes(pedido.ano)) {
            anosPreenchidos.push(pedido.ano)
        }
    }

    mesesPreenchidos.sort()
    anosPreenchidos.sort()
    anosPreenchidos.reverse()

    for(let mes of mesesPreenchidos) {
        let mesNome = null
        for(let [i, nome] of meses.entries()) {
            if(mes == i) {
                mesNome = nome
            }
        }
        let mesTexto = document.createTextNode(mesNome)
        let mesOption = document.createElement('option')
        
        mesOption.appendChild(mesTexto)
        filtroMes.appendChild(mesOption)
    }

    for(let ano of anosPreenchidos) {
        let anoTexto = document.createTextNode(ano)
        let anoOption = document.createElement('option')

        anoOption.appendChild(anoTexto)
        filtroAno.appendChild(anoOption)
    }

}

function guardarPedidos(movimentacao) {
    localStorage.clear()
    localStorage.setItem('totalPedidos', movimentacao.length)
    for(let i in movimentacao) {
        let pedido = JSON.stringify(movimentacao[i])
        localStorage.setItem(i, pedido)
    }
}

function pegarPedidos() {
    const totalPedidos = localStorage.getItem('totalPedidos') || 0
    const novaMovimentacao = []

    for(let i = 0; i < totalPedidos; i++) {
        const pedido = JSON.parse(localStorage.getItem(i))
        novaMovimentacao.push(pedido)
    }

    return novaMovimentacao
}