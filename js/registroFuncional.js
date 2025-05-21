document.getElementById("btnIniciarCadastro").addEventListener("click", async function (e) {
    e.preventDefault();

    const funcional = document.getElementById("rf").value.trim();
    const usafa = document.querySelector('input[name=usafa]:checked');
    const corUsafa = document.querySelector('input[name=corUsafa]:checked');
    
    if(funcional.length < 5){
        mostrarToast("Registro funcional inválido.");
        document.getElementById("rf").focus();
        return;
    }
    
    if(!usafa){
        mostrarToast("Selecione uma usafa.");
        return;
    }
    
    if(!corUsafa){
        mostrarToast("Selecione uma cor correspondente a sua equipe.");
        return;
    }
    
    const verifica = await agenteExiste(funcional);				
    const nomePorFuncional = await obterNomePorFuncional(funcional);

    if(!nomePorFuncional){
        mostrarToast("Registro funcional não localizado.");
        return;
    }
    
    if(verifica){
        localStorage.setItem("nomeLogado", nomePorFuncional);
        window.location.href = "etapa1.html";
    } else {
        mostrarToast("Solicite seu cadastro.");
    }
});
