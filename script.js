const listaEl = document.getElementById('lista-aulas');
const form = document.getElementById('form-aula');
const diaSelecionado = document.getElementById('dia-selecionado');

function getAulas() {
  return JSON.parse(localStorage.getItem('aulas') || '[]');
}

function salvarAula(aula) {
  const aulas = getAulas();
  aulas.push(aula);
  localStorage.setItem('aulas', JSON.stringify(aulas));
}

function excluirAula(indexParaExcluir) {
  const aulas = getAulas();
  aulas.splice(indexParaExcluir, 1);
  localStorage.setItem('aulas', JSON.stringify(aulas));
  if (diaSelecionado) {
    renderizarAulas(Number(diaSelecionado.value));
  }
}

function renderizarAulas(dia) {
  if (!listaEl) return;
  const aulas = getAulas().filter(a => Number(a.dia) === dia);
  aulas.sort((a, b) => a.horario.localeCompare(b.horario));
  listaEl.innerHTML = aulas.length === 0 ? '<p>Sem aulas neste dia! 🎉</p>' : '';
  aulas.forEach((aula, index) => {
    const div = document.createElement('div');
    div.className = 'aula';
    div.innerHTML = `
      <strong>${aula.horario}</strong> - ${aula.disciplina} <br />
      Turma: ${aula.turma} <br />
      Colégio: ${aula.colegio} <br />
      <button onclick="excluirAula(${getAulas().findIndex(a => JSON.stringify(a) === JSON.stringify(aula))})">Excluir</button>
    `;
    listaEl.appendChild(div);
  });
}

// Só ativa se o form existir
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const novaAula = {
      disciplina: document.getElementById('disciplina').value,
      turma: document.getElementById('turma').value,
      colegio: document.getElementById('colegio').value,
      horario: document.getElementById('horario').value,
      dia: document.getElementById('dia').value
    };
    salvarAula(novaAula);
    form.reset();
    if (diaSelecionado) {
      renderizarAulas(Number(diaSelecionado.value));
    }
  });
}

// Só ativa se o select existir
if (diaSelecionado) {
  diaSelecionado.addEventListener('change', () => {
    renderizarAulas(Number(diaSelecionado.value));
  });

  window.onload = () => {
    diaSelecionado.value = new Date().getDay();
    renderizarAulas(Number(diaSelecionado.value));
  };
}
