  document.addEventListener('DOMContentLoaded', () => {
    const especie = localStorage.getItem('especieSelecionada');
    const container = document.getElementById('camposEspecie');

    if (especie === 'cao') {
      container.innerHTML = `

           <div class="col">
              <div class="mb-3">
                <legend>Raças Caninas</legend>
                <label><input type="radio" name="racaCao" value="Afghan Hound"> Afghan Hound</label>
                <label><input type="radio" name="racaCao" value="Akita Inu"> Akita Inu</label>
                <label><input type="radio" name="racaCao" value="American Bully"> American Bully</label>
                <label><input type="radio" name="racaCao" value="Beagle"> Beagle</label>
                <label><input type="radio" name="racaCao" value="Bernese Mountain Dog"> Bernese Mountain Dog</label>
                <label><input type="radio" name="racaCao" value="Bichon Frisé"> Bichon Frisé</label>
                <label><input type="radio" name="racaCao" value="Border Collie"> Border Collie</label>
                <label><input type="radio" name="racaCao" value="Boxer"> Boxer</label>
                <label><input type="radio" name="racaCao" value="Bulldog Francês"> Bulldog Francês</label>
                <label><input type="radio" name="racaCao" value="Bulldog Inglês"> Bulldog Inglês</label>
                <label><input type="radio" name="racaCao" value="Cane Corso"> Cane Corso</label>
                <label><input type="radio" name="racaCao" value="Chihuahua"> Chihuahua</label>
                <label><input type="radio" name="racaCao" value="Chow Chow"> Chow Chow</label>
                <label><input type="radio" name="racaCao" value="Cocker Spaniel"> Cocker Spaniel</label>
                <label><input type="radio" name="racaCao" value="Dálmata"> Dálmata</label>
                <label><input type="radio" name="racaCao" value="Doberman"> Doberman</label>
                <label><input type="radio" name="racaCao" value="Dogue Alemão"> Dogue Alemão</label>
                <label><input type="radio" name="racaCao" value="Fila Brasileiro"> Fila Brasileiro</label>
                <label><input type="radio" name="racaCao" value="Golden Retriever"> Golden Retriever</label>
                <label><input type="radio" name="racaCao" value="Husky Siberiano"> Husky Siberiano</label>
                <label><input type="radio" name="racaCao" value="Labrador Retriever"> Labrador Retriever</label>
                <label><input type="radio" name="racaCao" value="Lhasa Apso"> Lhasa Apso</label>
                <label><input type="radio" name="racaCao" value="Maltês"> Maltês</label>
                <label><input type="radio" name="racaCao" value="Pastor Alemão"> Pastor Alemão</label>
                <label><input type="radio" name="racaCao" value="Pequinês"> Pequinês</label>
                <label><input type="radio" name="racaCao" value="Pinscher"> Pinscher</label>
                <label><input type="radio" name="racaCao" value="Poodle"> Poodle</label>
                <label><input type="radio" name="racaCao" value="Pug"> Pug</label>
                <label><input type="radio" name="racaCao" value="Rottweiler"> Rottweiler</label>
                <label><input type="radio" name="racaCao" value="Schnauzer"> Schnauzer</label>
                <label><input type="radio" name="racaCao" value="Shar Pei"> Shar Pei</label>
                <label><input type="radio" name="racaCao" value="Shih Tzu"> Shih Tzu</label>
                <label><input type="radio" name="racaCao" value="Spitz Alemão"> Spitz Alemão</label>
                <label><input type="radio" name="racaCao" value="Staffordshire Terrier"> Staffordshire Terrier</label>
                <label><input type="radio" name="racaCao" value="Vira-lata"> Vira-lata</label>
                </div>
            </div>

            <div class="col">
              <div class="mb-3">
                <legend>Doenças Canina</legend><br>
                <label><input type="radio" name="doencaCao" value="V8"> V8 (Polivalente)</label>
                <label><input type="radio" name="doencaCao" value="V10"> V10 (Polivalente)</label>
                <label><input type="radio" name="doencaCao" value="Antirrábica"> Antirrábica</label>
                <label><input type="radio" name="doencaCao" value="Gripe Canina"> Gripe Canina (Tosse dos Canis)</label>
                <label><input type="radio" name="doencaCao" value="Giardíase"> Giardíase</label>
                <label><input type="radio" name="doencaCao" value="Leishmaniose"> Leishmaniose</label>
                </div>
              </div>
            </div>

             <div class="col">
              <div class="mb-3">
                <legend>Status da Doença</legend>
                <label><input type="radio" name="statusDoencaCao" value="Em tratamento"> Em tratamento</label>
                <label><input type="radio" name="statusDoencaCao" value="Tratado"> Tratado</label>
               </div>
            </div>

            <div class="col">
              <div class="mb-3">
               <legend>Vacinas Caninas</legend>
                <label><input type="radio" name="vacinaCao" value="V8"> V8 (Polivalente)</label>
                <label><input type="radio" name="vacinaCao" value="V10"> V10 (Polivalente)</label>
                <label><input type="radio" name="vacinaCao" value="Antirrábica"> Antirrábica</label>
                <label><input type="radio" name="vacinaCao" value="Gripe Canina"> Gripe Canina (Tosse dos Canis)</label>
                <label><input type="radio" name="vacinaCao" value="Giardíase"> Giardíase</label>
                <label><input type="radio" name="vacinaCao" value="Leishmaniose"> Leishmaniose</label>
               </div>
            </div>

             <div class="col">
              <div class="mb-3">
               <legend>Vacinas Caninas</legend>
                <label><input type="radio" name="vacinaCao" value="V8"> V8 (Polivalente)</label>
                <label><input type="radio" name="vacinaCao" value="V10"> V10 (Polivalente)</label>
                <label><input type="radio" name="vacinaCao" value="Antirrábica"> Antirrábica</label>
                <label><input type="radio" name="vacinaCao" value="Gripe Canina"> Gripe Canina (Tosse dos Canis)</label>
                <label><input type="radio" name="vacinaCao" value="Giardíase"> Giardíase</label>
                <label><input type="radio" name="vacinaCao" value="Leishmaniose"> Leishmaniose</label>
               </div>
            </div>

            <div class="col">
              <div class="mb-3">
                  <legend>Dose das vacinas</legend>
                  <label><input type="radio" name="doseVacinaCao" value="Única"> Única</label>
                  <label><input type="radio" name="doseVacinaCao" value="1° dose"> 1° dose</label>
                  <label><input type="radio" name="doseVacinaCao" value="2° dose"> 2° dose</label>
               </div>
            </div>

            <div class="col">
              <div class="mb-3">
               <legend>Deficiência Canina</legend>
                <label><input type="radio" name="deficienciaCao" value="Nenhuma"> Nenhuma</label>
                <label><input type="radio" name="deficienciaCao" value="Amputação"> Amputação (membro)</label>
                <label><input type="radio" name="deficienciaCao" value="Cegueira"> Cegueira</label>
                <label><input type="radio" name="deficienciaCao" value="Surdez"> Surdez</label>
               </div>
            </div>
      `;
    } else if (especie === 'gato') {
      container.innerHTML = `


            <div class="col">
              <div class="mb-3">      
                <legend>Raças Felinas</legend>
                <label><input type="radio" name="racaGato" value="Siamês"> Siamês</label>
                <label><input type="radio" name="racaGato" value="Persa"> Persa</label>
                <label><input type="radio" name="racaGato" value="Maine Coon"> Maine Coon</label>
                <label><input type="radio" name="racaGato" value="Ragdoll"> Ragdoll</label>
                <label><input type="radio" name="racaGato" value="Sphynx"> Sphynx</label>
                <label><input type="radio" name="racaGato" value="Bengal"> Bengal</label>
                <label><input type="radio" name="racaGato" value="Scottish Fold"> Scottish Fold</label>
                <label><input type="radio" name="racaGato" value="British Shorthair"> British Shorthair</label>
                <label><input type="radio" name="racaGato" value="Abissínio"> Abissínio</label>
                <label><input type="radio" name="racaGato" value="Angorá"> Angorá</label>
                <label><input type="radio" name="racaGato" value="Himalaio"> Himalaio</label>
                <label><input type="radio" name="racaGato" value="Exótico de Pelo Curto"> Exótico de Pelo Curto</label>
                <label><input type="radio" name="racaGato" value="Oriental Shorthair"> Oriental Shorthair</label>
                <label><input type="radio" name="racaGato" value="Norueguês da Floresta"> Norueguês da Floresta</label>
                <label><input type="radio" name="racaGato" value="Russo Azul"> Russo Azul</label>
                <label><input type="radio" name="racaGato" value="Savannah"> Savannah</label>
                <label><input type="radio" name="racaGato" value="Selkirk Rex"> Selkirk Rex</label>
                <label><input type="radio" name="racaGato" value="Vira-lata"> Vira-lata</label>
               </div>
            </div>

            <div class="col">
              <div class="mb-3">
                  <legend>Doenças Felinas</legend>
                  <label><input type="radio" name="doencaGato" value="Leucemia Felina"> Leucemia Felina</label>
                  <label><input type="radio" name="doencaGato" value="Imunodeficiência Felina"> Imunodeficiência Felina</label>
                  <label><input type="radio" name="doencaGato" value="Peritonite Infecciosa Felina"> Peritonite Infecciosa Felina</label>
                  <label><input type="radio" name="doencaGato" value="Giardíase"> Giardíase</label>
                  <label><input type="radio" name="doencaGato" value="Clamidiose Felina"> Clamidiose Felina</label>
               </div>
            </div>

                 <div class="col">
              <div class="mb-3">
               <legend>Status da Doença</legend>
      <label><input type="radio" name="statusDoencaGato" value="Em tratamento"> Em tratamento</label>
      <label><input type="radio" name="statusDoencaGato" value="Tratado"> Tratado</label>
               </div>
            </div>

                 <div class="col">
              <div class="mb-3">
               <legend>Vacinas Felinas</legend>
      <label><input type="radio" name="vacinaGato" value="V4"> V4</label>
      <label><input type="radio" name="vacinaGato" value="V5"> V5</label>
      <label><input type="radio" name="vacinaGato" value="Antirrábica"> Antirrábica</label>
               </div>
            </div>

                 <div class="col">
              <div class="mb-3">
               
      <legend>Dose das vacinas</legend>
      <label><input type="radio" name="doseVacinaGato" value="Única"> Única</label>
      <label><input type="radio" name="doseVacinaGato" value="1° dose"> 1° dose</label>
      <label><input type="radio" name="doseVacinaGato" value="2° dose"> 2° dose</label>
               </div>
            </div>

                 <div class="col">
              <div class="mb-3">
                  <legend>Deficiência Felina</legend>
      <label><input type="radio" name="deficienciaGato" value="Nenhuma"> Nenhuma</label>
      <label><input type="radio" name="deficienciaGato" value="Amputação"> Amputação (membro)</label>
      <label><input type="radio" name="deficienciaGato" value="Cegueira"> Cegueira</label>
      <label><input type="radio" name="deficienciaGato" value="Surdez"> Surdez</label>

      
               </div>
            </div>

              <div class="col">
              <div class="mb-3">
              
      <legend>Lesões profundas no pelo do gato</legend>
      <label><input type="radio" name="lesoesProfundas" value="Sim"> Sim</label>
      <label><input type="radio" name="lesoesProfundas" value="Não"> Não</label>
    
               </div>
            </div>

      `;
    } else {
      container.innerHTML = `<p class="text-danger">Nenhuma espécie selecionada. Volte para a etapa 2.</p>`;
    }
  });
