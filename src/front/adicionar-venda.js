function carregarVendas() {
  fetch('https://api-cliente-servidor.onrender.com/vendas')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      exibirVendasComCheckboxes(data);
    })
    .catch(error => console.error('Erro ao carregar vendas:', error.message));
}

function exibirVendasComCheckboxes(vendas) {
  const container = document.getElementById('vendas-container');

  vendas.forEach(venda => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = venda.id;

    const label = document.createElement('label');
    label.textContent = `Nome: ${venda.nome}, Quantidade: ${venda.quantidade}`;

    const div = document.createElement('div');
    div.appendChild(checkbox);
    div.appendChild(label);

    container.appendChild(div);
  });
}

function adicionarAoCarrinho() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const vendasSelecionadas = Array.from(checkboxes).map(checkbox => checkbox.value);

  if (vendasSelecionadas.length === 0) {
    alert('Selecione pelo menos uma venda para adicionar ao carrinho.');
    return;
  }

  fetch('https://api-cliente-servidor.onrender.com/carrinho/adicionar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ vendas: vendasSelecionadas }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Vendas adicionadas ao carrinho com sucesso:', data);
      // Adicione aqui qualquer lógica adicional que você desejar após adicionar ao carrinho
    })
    .catch(error => console.error('Erro ao adicionar vendas ao carrinho:', error));
}
