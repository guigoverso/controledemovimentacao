function adicionarPedido() {
    movimentacao.push(gerarPedido())
    movimentacao = organizarMovimentacao(movimentacao)
    guardarPedidos(movimentacao)
    exibirPedidos()
}

function gerarPedido() {
    let movDate = document.getElementById('movDate')
    let pedidoNumero = document.getElementById('pedidoNumero')
    let pedidoPagamento = document.getElementById('pedidoPagamento')
    let pedidoValor = document.getElementById('pedidoValor')
    let pedidoObservacoes = document.getElementById('pedidoObservacoes')
    let pedidoNovaData = null

    if(pedidoForaData) {
        pedidoNovaData = document.getElementById('pedidoNovaData').value
    }

    let pedido = new Pedido()

    pedido.dataMovimentacao = movDate.value
    pedido.ano = (movDate.value).split('-')[0]
    pedido.mes = (movDate.value).split('-')[1]
    pedido.dia = (movDate.value).split('-')[2]
    pedido.numero = pedidoNumero.value
    pedido.pagamento = pedidoPagamento.value
    pedido.valor = pedidoValor.value
    pedido.data = pedidoNovaData || pedido.dataMovimentacao
    pedido.observacoes = pedidoObservacoes.value

    pedidoNumero.value = null
    pedidoPagamento.value = 'cartao'
    pedidoValor.value = null
    pedidoObservacoes.value = null

    if(pedidoForaData) pedidoForaDeData()

    return pedido
}

function pedidoForaDeData() {
    pedidoForaData = !pedidoForaData

    if(pedidoForaData) {
        novaData()
    } else {
        document.getElementById('novaData').innerHTML = ''
        document.getElementById('pedidoForaData').checked = false
    }
}

function novaData() {
    const blocoNovaData = document.getElementById('novaData')
    let botaoNovaData = document.createElement('input')
    botaoNovaData.setAttribute('type', 'date')
    botaoNovaData.setAttribute('id', 'pedidoNovaData')
    blocoNovaData.appendChild(botaoNovaData)
}