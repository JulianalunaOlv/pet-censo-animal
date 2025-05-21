document.addEventListener('DOMContentLoaded', () => {
  const especie = localStorage.getItem('especieSelecionada');
  const container = document.getElementById('camposEspecie');

  if (!container) return;

  if (especie === 'cao') {
    container.innerHTML = gerarCamposCaninos();
  } else if (especie === 'gato') {
    container.innerHTML = gerarCamposFelinos();
  } else {
    container.innerHTML = '<p>Espécie não reconhecida.</p>';
  }
});

function gerarCamposComuns() {
  return `
    ${gerarSecao('Como é feito o descarte das fezes do seu pet?', 'descarteFezes', [
      'Lixeira', 'Enterra', 'Vaso Sanitário', 'Em terreno baldio', 'Fica na rua onde ele estava'
    ])}

    ${gerarSecao('O pet tem acesso à rua?', 'acessoRua', [
      'Não', 'Sim, acompanhado sem guia / coleira',
      'Sim, acompanhado com guia / coleira', 'Sim, sozinho'
    ])}

    ${gerarSecao('O pet tem acesso à faixa de areia na praia?', 'acessoFaixaAreia', [
      'Não', 'Sim, acompanhado sem guia / coleira',
      'Sim, acompanhado com guia / coleira', 'Sim, sozinho'
    ])}
  `;
}

function gerarCamposCaninos() {
  return `
    ${gerarSecao('Raças Caninas', 'racaCao', [
      'Afghan Hound', 'Akita Inu', 'American Bully', 'Beagle', 'Bernese Mountain Dog', 'Bichon Frisé', 'Border Collie',
      'Boxer', 'Bulldog Francês', 'Bulldog Inglês', 'Cane Corso', 'Chihuahua', 'Chow Chow', 'Cocker Spaniel', 'Dálmata',
      'Doberman', 'Dogue Alemão', 'Fila Brasileiro', 'Golden Retriever', 'Husky Siberiano', 'Labrador Retriever',
      'Lhasa Apso', 'Maltês', 'Pastor Alemão', 'Pequinês', 'Pinscher', 'Poodle', 'Pug', 'Rottweiler', 'Schnauzer',
      'Shar Pei', 'Shih Tzu', 'Spitz Alemão', 'Staffordshire Terrier', 'Vira-lata'
    ])}

    ${gerarSecao('Doenças Caninas', 'doencaCao', ['Cinomose', 'Parvovirose', 'Leptospirose', 'Leishmaniose'])}

    ${gerarSecao('Status da Doença', 'statusDoencaCao', ['Em tratamento', 'Tratado'])}

    ${gerarSecao('Vacinas Caninas', 'vacinaCao', ['V8', 'V10', 'Antirrábica', 'Gripe Canina', 'Giardíase'])}

    ${gerarSecao('Dose das Vacinas', 'doseVacinaCao', ['Única', '1° dose', '2° dose'])}

    ${gerarSecao('Deficiência Canina', 'deficienciaCao', ['Nenhuma', 'Amputação', 'Cegueira', 'Surdez'])}

    ${gerarSecao('Última vacina contra raiva', 'ultimaVacinaRaiva', [
      'Nunca', 'Somente quando filhote', 'A cada 3 meses', 'A cada 6 meses', '1 vez ao ano'
    ])}

    ${gerarSecao('Uso do vermífugo', 'usoVermifugo', [
      'Nunca', 'Somente quando filhote', 'A cada 3 meses', 'A cada 6 meses', '1 vez ao ano'
    ])}

    ${gerarSecao('Onde seu pet costuma defecar?', 'ondeDefecaCao', [
      'Rua', 'Dentro de casa', 'Banheiro específico', 'Área externa', 'Tapete higiênico'
    ])}

    ${gerarCamposComuns()}
  `;
}

function gerarCamposFelinos() {
  return `
    ${gerarSecao('Raças Felinas', 'racaGato', [
      'Persa', 'Siamês', 'Maine Coon', 'Sphynx', 'Angorá', 'Bengal', 'Azul Russo', 'British Shorthair',
      'Ragdoll', 'Norueguês da Floresta', 'SRD (vira-lata)'
    ])}

    ${gerarSecao('Doenças Felinas', 'doencaGato', ['FIV', 'FeLV', 'Panleucopenia', 'Calicivirose'])}

    ${gerarSecao('Status da Doença', 'statusDoencaGato', ['Em tratamento', 'Tratado'])}

    ${gerarSecao('Vacinas Felinas', 'vacinaGato', ['V3', 'V4', 'V5', 'Antirrábica'])}

    ${gerarSecao('Dose das Vacinas', 'doseVacinaGato', ['Única', '1° dose', '2° dose'])}

    ${gerarSecao('Deficiência Felina', 'deficienciaGato', ['Nenhuma', 'Amputação', 'Cegueira', 'Surdez'])}

    ${gerarSecao('Última vacina contra raiva', 'ultimaVacinaRaivaGato', [
      'Nunca', 'Somente quando filhote', 'A cada 3 meses', 'A cada 6 meses', '1 vez ao ano'
    ])}

    ${gerarSecao('Uso do vermífugo', 'usoVermifugoGato', [
      'Nunca', 'Somente quando filhote', 'A cada 3 meses', 'A cada 6 meses', '1 vez ao ano'
    ])}

    ${gerarSecao('Onde seu gato costuma defecar?', 'ondeDefecaGato', [
      'Caixa de areia', 'Banheiro específico', 'Área externa', 'Tapete higiênico', 'Outros'
    ])}

    ${gerarCamposComuns()}
  `;
}

// Utilitários
function gerarSecao(titulo, name, opcoes) {
  return `
    <div class="col mb-3">
      <legend>${titulo}</legend>
      ${gerarRadios(name, opcoes)}
    </div>
  `;
}

function gerarRadios(name, valores) {
  return valores.map(valor => `
    <label><input type="radio" name="${name}" value="${valor}"> ${valor}</label>
  `).join('<br>');
}
