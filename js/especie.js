// Salva a espécie no localStorage ao selecionar
function salvarEspecieLocalStorage() {
  const especieSelecionada = document.querySelector('input[name="especie"]:checked')?.value;
  if (especieSelecionada) {
    localStorage.setItem('especieSelecionada', especieSelecionada);
    carregarCamposDaEspecie(especieSelecionada);
  }
}

// Carrega os campos da espécie ao trocar a seleção
function carregarCamposDaEspecie(especie) {
  const container = document.getElementById('camposEspecie');
  if (!container) return;

  if (especie === 'cao' || especie === 'gato') {
    // Garante que o JS do especieCampos.js esteja carregado
    const script = document.createElement('script');
    script.src = 'especieCampos.js'; // Caminho correto
    document.body.appendChild(script);
  }
}

// Verifica se a espécie foi escolhida antes de prosseguir para a etapa 3
function verificarEProsseguir() {
  const especie = localStorage.getItem('especieSelecionada');
  if (!especie) {
    alert('Por favor, selecione uma espécie antes de avançar.');
    return;
  }
  window.location.href = 'etapa3.html';
}

// Reexibe os campos da espécie selecionada ao voltar para etapa 2
document.addEventListener('DOMContentLoaded', () => {
  const especie = localStorage.getItem('especieSelecionada');
  if (especie) {
    document.getElementById(especie).checked = true;
    carregarCamposDaEspecie(especie);
  }
});
