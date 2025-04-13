// Elementos do HTML
const form = document.getElementById('form-cronograma');
const listaCronograma = document.getElementById('lista-cronograma');

// Função para obter o cronograma do localStorage (persistência)
function getCronograma() {
    return JSON.parse(localStorage.getItem('cronograma') || '[]');
}

// Função para salvar o cronograma no localStorage
function salvarCronograma(cronograma) {
    localStorage.setItem('cronograma', JSON.stringify(cronograma));
}

// Função para renderizar a lista de aulas
function renderizarCronograma() {
    const cronograma = getCronograma();
    listaCronograma.innerHTML = ''; // Limpar a lista antes de re-renderizar
    cronograma.forEach((aula) => {
        const div = document.createElement('div');
        div.className = 'cronograma-item';
        div.innerHTML = `
            <strong>Data: ${aula.data}</strong><br />
            Tema: ${aula.tema} <br />
            Atividade: ${aula.atividade} <br />
            Avaliação: ${aula.avaliacao ? aula.avaliacao : 'Sem avaliação'}<br />
        `;
        listaCronograma.appendChild(div);
    });
}

// Adicionar nova aula ao cronograma
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const novaAula = {
        data: document.getElementById('data').value,
        tema: document.getElementById('tema').value,
        atividade: document.getElementById('atividade').value,
        avaliacao: document.getElementById('avaliacao').value,
    };

    const cronograma = getCronograma();
    cronograma.push(novaAula);
    salvarCronograma(cronograma);
    form.reset();
    renderizarCronograma(); // Atualizar a lista na tela
});

// Carregar cronograma quando a página for carregada
window.onload = renderizarCronograma;
