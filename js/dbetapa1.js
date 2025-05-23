const nomeLogado = localStorage.getItem("nomeLogado");

document.getElementById("divSpanNomeLogado").textContent = `Usuário Logado: ${nomeLogado}`;

document.getElementById("chaveFuncional").value = nomeLogado;

const DB_NAME = "MinhaBaseDeDados";
const DB_VERSION = 1;
const STORE_NAME = "Pessoa";

// // Abre ou cria o banco de dados
// function abrirDB() {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open(DB_NAME, DB_VERSION);
//     request.onerror = () => reject("Erro ao abrir o banco de dados.");
//     request.onsuccess = () => resolve(request.result);
//     request.onupgradeneeded = (event) => {
//       const db = event.target.result;
//       if (!db.objectStoreNames.contains(STORE_NAME)) {
//         db.createObjectStore(STORE_NAME, { keyPath: "id" }); // chave manual
//       }
//     };
//   });
// }

// Abre ou cria o banco de dados
function abrirDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = () => reject("Erro ao abrir o banco de dados.");
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Cria a "lista" de Pessoa se ela não existir
            if (!db.objectStoreNames.contains("Pessoa")) {
                db.createObjectStore("Pessoa", { keyPath: "id" });
            }

            // Cria a "lista" de Pet se ela não existir (ESSA É A NOVIDADE AQUI!)
            if (!db.objectStoreNames.contains("Pet")) {
                db.createObjectStore("Pet", { keyPath: "id" });
            }
        };
    });
}

// Salva ou atualiza pessoa
async function salvarPessoa(pessoa) {
  const db = await abrirDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.put(pessoa);
  return tx.complete;
}

// Lista todas as pessoas
async function listarPessoas() {
  const db = await abrirDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const request = store.getAll();
  request.onsuccess = () => renderizarTabela(request.result);
}

// // Remove pessoa
// async function removerPessoa(id) {
//   const db = await abrirDB();
//   const tx = db.transaction(STORE_NAME, "readwrite");
//   const store = tx.objectStore(STORE_NAME);
//   store.delete(id);
//   return tx.complete;
// }

// Exibe pessoas na tabela
function renderizarTabela(pessoas) {
  const tbody = document.getElementById("corpoTabela");
  tbody.innerHTML = "";
  if (pessoas.length === 0) {
    tbody.innerHTML =
      "<tr><td colspan='8'>Nenhum cadastro encontrado.</td></tr>";
    return;
  }
  pessoas.forEach((p) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.cdFuncionalAgenteData}</td>
	  <td>${p.id}</td>
      <td>${p.nomeCompleto}</td>
      <td>${p.cpf}</td>
      <td>${p.possuiPet === "sim" ? "Sim" : "Não"}</td>
      <td>Salvo</td>
      <td>
        <button class="btn btn-sm btn-info editar-btn" data-id="${
          p.id
        }">Editar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  //<td>${p.qtdPets || "-"}</td> Estava acima e foi movido pra cá

  // Adiciona listeners para os botões de editar
  document.querySelectorAll(".editar-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      carregarPessoaParaEdicao(id);
    });
  });
}

// Modifique obterDadosFormulario para verificar se está editando
function obterDadosFormulario() {
  const editingId = document.getElementById("content").dataset.editingId;
  return {
    id: editingId || crypto.randomUUID(), // Usa o ID existente se estiver editando, senão gera um novo
    cdFuncionalAgenteData: document.getElementById("chaveFuncional").value.trim(), // CHAVE ESTRANGEIRA
    cdChaveFamiliaCenso: "", // CHAVE ESTRANGEIRA
    cpf: document.getElementById("cpf").value.trim(),
    nomeCompleto: document.getElementById("nomeCompleto").value.trim(),
    nomeSocial: document.getElementById("nomeSocial").value.trim(),
    dataNascimento: document.getElementById("dataNascimento").value,
    email: document.getElementById("email").value.trim(),
    celular: document.getElementById("celular").value.trim(),
    sus: document.getElementById("sus").value.trim(), // NÚMERO DA MATRÍCULA USAFA
    cep: document.getElementById("cep").value.trim(), // OU (campo nrCEP dentro de) cdEnderecoCenso: '', // CHAVE ESTRANGEIRA
    endereco: document.getElementById("endereco").value.trim(), // OU (campo nrEndereco dentro de) cdEnderecoCenso: '', // CHAVE ESTRANGEIRA
    numero: document.getElementById("numero").value.trim(), // OU (não tem campo nrNumero dentro de) cdEnderecoCenso: '', // CHAVE ESTRANGEIRA
    complemento: document.getElementById("complemento").value.trim(), // OU (campo dsComplemento dentro de) cdEnderecoCenso: '', // CHAVE ESTRANGEIRA
    bairro: document.getElementById("bairro").value.trim(), // OU (campo nrBairro dentro de) cdEnderecoCenso: '', // CHAVE ESTRANGEIRA
    possuiPet:
      document.querySelector('input[name="possuiPet"]:checked')?.value || "nao",
    // qtdPets: null
  };
}

// Remova o event listener de submit do formulário se for usar o botão "Salvar Edição"
// document.getElementById("content").addEventListener("submit", async function (e) { ... });

// Criar uma função para limpar o formulário
function limparFormulario() {
  const form = document.querySelector("form");
  if (form) {
    form.reset();
    document.getElementById("content").removeAttribute("data-editingId"); // Limpa o ID de edição
  }
}

// Busca uma pessoa pelo ID e preenche o formulário
async function carregarPessoaParaEdicao(id) {
  const db = await abrirDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const request = store.get(id);

  request.onsuccess = (event) => {
    const pessoa = event.target.result;
    if (pessoa) {
      document.getElementById("chavePessoa").value = pessoa.id;
      document.getElementById("chaveFuncional").value = pessoa.cdFuncionalAgenteData;
      document.getElementById("cpf").value = pessoa.cpf;
      document.getElementById("nomeCompleto").value = pessoa.nomeCompleto;
      document.getElementById("nomeSocial").value = pessoa.nomeSocial;
      document.getElementById("dataNascimento").value = pessoa.dataNascimento;
      document.getElementById("email").value = pessoa.email;
      document.getElementById("celular").value = pessoa.celular;
      document.getElementById("sus").value = pessoa.sus;
      document.getElementById("cep").value = pessoa.cep;
      document.getElementById("endereco").value = pessoa.endereco;
      document.getElementById("numero").value = pessoa.numero;
      document.getElementById("complemento").value = pessoa.complemento;
      document.getElementById("bairro").value = pessoa.bairro;

      if (pessoa.possuiPet === "sim") {
        document.getElementById("animalSim").checked = true;
      } else {
        document.getElementById("animalNao").checked = true;
      }

      // Armazena o ID do registro que está sendo editado
      document.getElementById("content").dataset.editingId = pessoa.id;

      // Altera o título do formulário para indicar edição
      document.querySelector("h1").textContent = "EDITAR DADOS DO CENSO PET";

      // Esconde o botão "Avançar" e mostra um botão de "Salvar Edição"
      document.getElementById("botaoAvancar").classList.add("d-none");
      let btnSalvarEdicao = document.getElementById("btnSalvarEdicao");
      if (!btnSalvarEdicao) {
        btnSalvarEdicao = document.createElement("button");
        btnSalvarEdicao.id = "btnSalvarEdicao";
        btnSalvarEdicao.classList.add("btn", "btn-success", "ms-2");
        btnSalvarEdicao.textContent = "Salvar Edição";
        document
          .querySelector(".d-grid.gap-2.d-md-flex.justify-content-md-end")
          .appendChild(btnSalvarEdicao);

        btnSalvarEdicao.addEventListener("click", async () => {
          const idParaAtualizar =
            document.getElementById("content").dataset.editingId;
          if (idParaAtualizar) {
            const dadosAtualizados = obterDadosFormulario();
            dadosAtualizados.id = idParaAtualizar; // Garante que o ID é o do registro original
            await salvarPessoa(dadosAtualizados); // Use a mesma função salvarPessoa
            alert("Dados atualizados com sucesso!");
            listarPessoas(); // Atualiza a tabela
            limparFormulario(); // Limpa o formulário
            // Reverte o título e os botões
            document.querySelector("h1").textContent = "FORMULÁRIO CENSO PET";
            btnSalvarEdicao.remove();
            document.getElementById("botaoAvancar").classList.remove("d-none");
          }
        });
      }
    } else {
      alert("Pessoa não encontrada.");
    }
  };
}

// Lida com o envio do formulário (seja para novo cadastro ou edição)
document
  .getElementById("content")
  .addEventListener("submit", async function (e) {
    // Verifica se o evento de submit é de um formulário dentro do #content
    if (e.target.tagName === "FORM") {
      e.preventDefault(); // Impede o comportamento padrão de recarregar a página

      const dados = obterDadosFormulario(); // Coleta os dados do formulário

      // Verifique se há um ID de edição armazenado no dataset
      const editingId = document.getElementById("content").dataset.editingId;

      if (editingId) {
        // Se houver um ID de edição, atribua-o aos dados para atualizar o registro existente
        dados.id = editingId;
      } else {
        // Caso contrário, se for um novo cadastro, um novo ID já será gerado por obterDadosFormulario()
        // ou você pode garantir que ele seja gerado aqui se preferir.
        // dados.id = crypto.randomUUID(); // <-- Já é tratado dentro de obterDadosFormulario
      }

      try {
        await salvarPessoa(dados); // Salva ou atualiza a pessoa no IndexedDB
        listarPessoas(); // Atualiza a tabela exibida

        // Limpa o formulário e remove o ID de edição
        e.target.reset();
        document.getElementById("content").removeAttribute("data-editingId");

        // Reverte o título do formulário para o padrão
        document.querySelector("h1").textContent = "FORMULÁRIO CENSO PET";

        // Esconde o botão "Salvar Edição" se ele existir
        const btnSalvarEdicao = document.getElementById("btnSalvarEdicao");
        if (btnSalvarEdicao) {
          btnSalvarEdicao.remove();
        }
        // Garante que o botão "Avançar" esteja visível para novos cadastros
        document.getElementById("botaoAvancar").classList.remove("d-none");

        alert("Dados salvos com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar os dados:", error);
        alert(
          "Ocorreu um erro ao salvar os dados. Por favor, tente novamente."
        );
      }
    }
  });

// Botões e lógica de navegação
document.addEventListener("DOMContentLoaded", () => {
  const radioSim = document.getElementById("animalSim");
  const radioNao = document.getElementById("animalNao");
  const botaoAvancar = document.getElementById("botaoAvancar");
  const botaoAvancar2 = document.getElementById("btnRealizarNovoCadastro");

  // OBTENHA A REFERÊNCIA DO SEU BOTÃO "VOLTAR AO INÍCIO" AQUI
  // Se ele não tiver um ID, adicione um no HTML (ex: id="btnVoltarInicio" ou id="linkVoltarInicio")
  const botaoVoltarInicio = document.getElementById("btnVoltarInicio"); // <--- MUDAR PARA O ID REAL DO SEU BOTÃO/LINK "VOLTAR AO INÍCIO"

  if (botaoAvancar && radioSim && radioNao) {
    // Função para resetar o estado dos botões para o padrão de "novo cadastro"
    // (Voltar ao Início e Avançar para Etapa 2)
    function resetBotoesParaNovoCadastro() {
        botaoAvancar.classList.remove("d-none"); // Garante que "Avançar" esteja visível
        botaoAvancar.textContent = "Avançar para Etapa 2"; // Define o texto para "Avançar para Etapa 2"
        botaoAvancar.onclick = () => { // Define a ação para redirecionar para etapa2.html
            window.location.href = "etapa2.html";
        };

        if (botaoVoltarInicio) { // Se o botão "Voltar ao Início" existir e for gerenciado
            botaoVoltarInicio.classList.remove("d-none"); // Garante que ele esteja visível
            // Se ele tiver um 'onclick' ou 'href' específico para voltar ao início, não precisa definir aqui
            // Ex: botaoVoltarInicio.onclick = () => { window.location.href = "index.html"; };
        }

        // Configura o botaoAvancar para ser "Iniciar Novo Cadastro" e levar para etapa1.html
        botaoAvancar2.classList.remove("d-none"); // Garante que ele esteja visível
        botaoAvancar2.textContent = "Iniciar Novo Cadastro"; // MUDA O TEXTO AQUI!
        botaoAvancar2.onclick = () => { // MUDA A AÇÃO AQUI!
            window.location.href = "etapa1.html"; // Redireciona para etapa1.html
        };
    }

    function atualizarBotao() {
      const editingId = document.getElementById("content").dataset.editingId;
      // botaoAvancar.classList.remove("d-none");

      if (editingId) {
        // Se estiver em modo de edição, esconde o botão "Avançar"
        botaoAvancar.classList.add("d-none");
        return; // Sai da função, não define textContent ou onclick
      } else {
        // Se não estiver em modo de edição, garante que o botão "Avançar" esteja visível
        botaoAvancar.classList.remove("d-none");
      }

      // if (radioSim.checked) {
      //   botaoAvancar.textContent = "Avançar para Etapa 2";
      //   botaoAvancar.onclick = () => {
      //     const dados = obterDadosFormulario();
      //     if (!dados.id) { // Se for um novo cadastro, salve
      //       salvarPessoa(dados)
      //         .then(() => {
      //           window.location.href = "etapa2.html";

      //         })
      //         .catch(error => {
      //           alert("Erro ao salvar os dados para avançar para a Etapa 2.");
      //           console.error(error);
      //         });
      //     } else { // Se já for edição, apenas avança (os dados já foram "salvos" ao preencher o formulário)
      //       window.location.href = "etapa2.html";
      //     }
      //   };
      // }

      if (radioSim.checked) {
        // AQUI: Alteramos a funcionalidade do botão "Finalizar Cadastro" para avançar para Etapa 2
        // Apesar do texto, a ação será de salvar e redirecionar para a Etapa 2.
        botaoAvancar.textContent = "Avançar para Etapa 2"; // Pode manter "Finalizar Cadastro" ou mudar o texto
        botaoAvancar.onclick = async () => {
          const dados = obterDadosFormulario();
          try {
            // **Salva os dados, mesmo que o usuário não possua pet, e avança.**
            await salvarPessoa(dados);
            console.log(
              "Dados salvos (não possui pet) antes de avançar para a Etapa 2."
            );

            // Redireciona para a Etapa 2, mesmo sem pets (para mostrar a Etapa 2 vazia ou com uma mensagem).
            window.location.href = "etapa2.html";

            // Removidas as linhas de alert, listarPessoas, limparFormulario, etc.,
            // pois a intenção é AVANÇAR, não finalizar e exibir a lista.
            // Se você quiser que o cadastro seja "finalizado" no sentido de completo
            // mas ainda leve para a etapa 2 para alguma visualização, ajuste o texto
            // do botão e a lógica na etapa 2.
          } catch (err) {
            console.error(
              "Erro ao salvar e avançar para Etapa 2 (não possui pet):",
              err
            );
            alert(
              "Erro ao salvar e avançar para a Etapa 2. Por favor, tente novamente."
            );
          }
        };
      } else if (radioNao.checked) {
        botaoAvancar.textContent = "Finalizar Cadastro";
        botaoAvancar.onclick = async () => {
          const dados = obterDadosFormulario();
          try {
            await salvarPessoa(dados);
            alert("Cadastro finalizado com sucesso!");
            listarPessoas();
            limparFormulario(); // Limpa o formulário após salvar
            // Reverte o título e esconde o botão de salvar edição se ele existir
            document.querySelector("h1").textContent = "FORMULÁRIO CENSO PET";
            const btnSalvarEdicao = document.getElementById("btnSalvarEdicao");
            if (btnSalvarEdicao) btnSalvarEdicao.remove();
            botaoAvancar.classList.remove("d-none"); // Garante que o botão avançar apareça novamente

            // Após salvar e limpar, resetamos para o estado padrão de "novo cadastro"
            resetBotoesParaNovoCadastro();

          } catch (err) {
            console.error("Erro ao finalizar o cadastro:", err);
            alert("Erro ao finalizar o cadastro.");
          }
        };
      }
    }

    radioSim.addEventListener("change", atualizarBotao);
    radioNao.addEventListener("change", atualizarBotao);
    // Adicione um evento para quando o formulário for "resetado" ou quando iniciar sem edição
    // Para garantir que o botão "Avançar" esteja correto
    atualizarBotao(); // Chama no carregamento para definir o estado inicial
  }
});

// Sincronizar (placeholder)
function sincronizarCadastros() {
  alert("Funcionalidade de sincronização ainda não implementada.");
}

// Inicialização
listarPessoas();
