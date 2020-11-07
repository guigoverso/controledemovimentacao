function exibirPedidos() {
    const listaFiltros = pegarFiltros()
    console.log('Lista de Filtros:', listaFiltros)
    const pedidosFiltrados = filtros(listaFiltros, movimentacao)
    console.log('Pedidos Filtrados:', pedidosFiltrados)
    preencherTabelaPedidos(pedidosFiltrados)
}

function limparFiltros() {
    document.getElementById('filtroData').value = ''
    document.getElementById('filtroAno').value = ''
    document.getElementById('filtroNumero').value = ''
    document.getElementById('filtroPagamento').value = ''
    document.getElementById('filtroMes').value = ''
}

function pegarFiltros() {
    const dataMovimentacao = document.getElementById('filtroData').value
    const ano = document.getElementById('filtroAno').value
    const numero = document.getElementById('filtroNumero').value
    const pagamento = document.getElementById('filtroPagamento').value
    
    const mesNome = document.getElementById('filtroMes').value
    const mes = ''

    for(i in meses) {
        if(mes[i] === mesNome) {
            mes = i
        }
    }
    
    return {
        dataMovimentacao, 
        mes, 
        ano, 
        numero, 
        pagamento,
    }
}

function filtros(listaFiltros, movimentacao) {
    const filtrosEscolhidos = {}
    Object.keys(listaFiltros).map(filtro => {
        if(listaFiltros[filtro]) {
            filtrosEscolhidos[filtro] = listaFiltros[filtro]
        } 
    }
    )
    console.log('Filtros Escolhidos:', filtrosEscolhidos)
    
    const pedidosFiltrados = []

    if(!Object.keys(filtrosEscolhidos).length) {
        console.log('Passou por aqui')
        pedidosFiltrados.push(...movimentacao)
        return pedidosFiltrados    
    }

    movimentacao.filter(pedido => {
        let filtrarPedido = false    
        for(let filtro in filtrosEscolhidos) {
            console.log('Filtro atual:', filtro, filtrosEscolhidos[filtro], '||', pedido[filtro])
            if(filtrosEscolhidos[filtro] == pedido[filtro]) {
                filtrarPedido = true
                continue
            } else {
                console.log('Pedido:', pedido)
                filtrarPedido = false
                break
            }
        }
        if(filtrarPedido) {
            console.log('Pedido filtrado: ', pedido)
            pedidosFiltrados.push(pedido)
        }
    })

    return pedidosFiltrados
}

function preencherTabelaPedidos(pedidosFiltrados) {
    let tabelaPedidos = document.getElementById('tabelaPedidos')

    while(tabelaPedidos.firstElementChild != tabelaPedidos.lastElementChild) {
        tabelaPedidos.removeChild(tabelaPedidos.lastElementChild)
    }

    for(let pedido of pedidosFiltrados) {
        let tr = document.createElement('tr')
        
        let tds = [
            criarTag('td', pedido.dataMovimentacao),
            criarTag('td', pedido.numero),
            criarTag('td', pedido.pagamento),
            criarTag('td', pedido.valor),
            criarTag('td', pedido.data),
            criarTag('td', pedido.observacoes),
            criarTag('button', 'x')
        ]

        tds[tds.length - 1].setAttribute('onmousedown', `removerPedido('${pedido.numero}')`)

        tds.forEach(td => {
            tr.appendChild(td)
        })

        tabelaPedidos.appendChild(tr)
    }
}

function criarTag(tag, valor) {
    let td = document.createElement(tag)
    td.appendChild(document.createTextNode(valor))

    return td
}

function removerPedido(numeroPedido) {  
    movimentacao = movimentacao.filter(pedido => {
        console.log(pedido.numero, numeroPedido, pedido.numero == numeroPedido)
        if(pedido.numero != numeroPedido) return pedido
    })
    guardarPedidos(movimentacao)
    exibirPedidos()
}