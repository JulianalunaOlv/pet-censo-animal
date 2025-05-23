let db;

// Inicializa o IndexedDB criando (ou atualizando) a store e os índices necessários
function initDB() {
  return new Promise((resolve, reject) => {
    // Usamos a versão 2 para incluir o índice "nome".  
    const request = indexedDB.open("dbCensoPetPG_Allan_01", 2);

    request.onerror = (event) => {
      console.error("Erro ao abrir o banco:", event.target.error);
      reject(event.target.error);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      let store;
      // Se a object store ainda não existir, crie-a
      if (!db.objectStoreNames.contains("tbAgenteCenso")) {
        store = db.createObjectStore("tbAgenteCenso", { keyPath: "idAgenteCenso", autoIncrement: true });
      } else {
        store = event.currentTarget.transaction.objectStore("tbAgenteCenso");
      }

      // Cria ou garante os índices necessários
      if (!store.indexNames.contains("chaveFuncionalAgente")) {
        store.createIndex("chaveFuncionalAgente", "chaveFuncionalAgente", { unique: true });
      }
      if (!store.indexNames.contains("funcional")) {
        // Usamos unique: true para evitar nomes repetidos, mas se não for necessário, basta unique: false
        store.createIndex("funcional", "funcional", { unique: true });
      }
	  if (!store.indexNames.contains("nome")) {        
        store.createIndex("nome", "nome");
      }
	  if (!store.indexNames.contains("usafa")) {        
        store.createIndex("usafa", "usafa");
      }
	  if (!store.indexNames.contains("cor")) {        
        store.createIndex("cor", "cor");
      }

      console.log("Object store e índices configurados.");
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("Banco aberto com sucesso.");
      resolve(db);
    };
  });
}

// Função que verifica se já existe um agente com o funcional especificado
function agenteExiste(funcional) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tbAgenteCenso"], "readonly");
    const store = transaction.objectStore("tbAgenteCenso");
    const index = store.index("funcional");

    const request = index.get(funcional);

    request.onsuccess = () => {
      // Se o resultado não for undefined, significa que existe um registro com esse funcional
      resolve(request.result !== undefined);
	  //return true;
    };

    request.onerror = (event) => {
      reject("Erro na busca: " + event.target.error);
	  //return false;
    };
  });
}

// Função para cadastrar uma lista de agentes (objAgente)
// Cada objeto no array deve ter pelo menos a propriedade "funcional". Se "chaveFuncionalAgente" não for informada,
// ela será gerada automaticamente com crypto.randomUUID()
async function cadastrarListaAgentes(listaAgentes) {
  // Percorre cada agente da lista
  for (const agente of listaAgentes) {
    try {
      // Verifica se já existe um agente com o mesmo funcional
      const existe = await agenteExiste(agente.funcional);
      if (existe) {
        console.log(`Agente com funcional "${agente.funcional}" já cadastrado.`);
        continue; // Pula para o próximo agente
      }

      // Cria uma transação de escrita para inserir um novo agente
      const transaction = db.transaction(["tbAgenteCenso"], "readwrite");
      const store = transaction.objectStore("tbAgenteCenso");
      
      // Se não foi informado a chave funcional, gera uma nova usando crypto.randomUUID()
      if (!agente.chaveFuncionalAgente) {
        agente.chaveFuncionalAgente = crypto.randomUUID();
      }

      const requestAdd = store.add(agente);
      requestAdd.onsuccess = () => {
        console.log(`Agente "${agente.funcional}" cadastrado com sucesso.`);
      };
      requestAdd.onerror = (event) => {
        console.error(`Erro ao cadastrar agente "${agente.funcional}":`, event.target.error);
      };

    } catch (error) {
      console.error("Erro durante a inserção do agente:", error);
    }
  }
}

// Fluxo: Inicializa o DB e, depois, insere uma lista de agentes

initDB().then(() => {
  // Exemplo de lista de agentes a serem cadastrados
  const listaAgentes = [
    { funcional: "51600", nome: "Allan", usafa: "Mirim I", cor: "Azul" },  
    { funcional: "51601", nome: "Beatriz", usafa: "Guilhermina", cor: "Amarelo" },
    { funcional: "51602", nome: "Carlos", usafa: "Aviação", cor: "Vermelho" },
    { funcional: "51600", nome: "Fulano", usafa: "Boqueirão", cor: "Azul" }  // Tentativa de cadastro duplicado (pelo funcional)
  ];

  cadastrarListaAgentes(listaAgentes);
}).catch(error => {
  console.error("Falha ao inicializar o banco de dados:", error);
});



// Função que, dado o funcional, busca o registro e retorna sua chave (nome)
function obterNomePorFuncional(funcional) {
  return new Promise((resolve, reject) => {
    // Cria uma transação somente para leitura na object store "tbAgenteCenso"
    const transaction = db.transaction(["tbAgenteCenso"], "readonly");
    const store = transaction.objectStore("tbAgenteCenso");

    // Verifica se o índice "funcional" existe antes de usá-lo
    if (!store.indexNames.contains("funcional")) {
      reject("Índice 'funcional' não existe na object store.");
      return;
    }
    
    const index = store.index("funcional");
    const request = index.get(funcional);
    
    request.onsuccess = () => {
      if (request.result) {
        // Retorna a chave primária do registro encontrado
        resolve(request.result.nome);
      } else {
        // Se não encontrar, pode retornar null, undefined ou tratar de outra forma
        resolve(null);
      }
    };
    
    request.onerror = (event) => {
      reject("Erro ao buscar registro: " + event.target.error);
    };
  });
}





function salvarCadastro(dados) {
  const transaction = db.transaction(["tbAgenteCenso"], "readwrite");
  const store = transaction.objectStore("tbAgenteCenso");

  const request = store.add(dados);

  request.onsuccess = () => {
    alert("Cadastro salvo com sucesso no IndexedDB!");
  };

  request.onerror = (event) => {
    console.error("Erro ao salvar:", event.target.error);
  };
}
