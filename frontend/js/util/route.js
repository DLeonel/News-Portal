export async function req ({method, }) {

    // Enviar dados ao salvar
    const saveConfigBtn = document.querySelector("#saveConfig")

    saveConfigBtn.addEventListener("click", async () => {
        const inputTitlePrimary_homePage = document.querySelector("#inputTitlePrimary_homePage");
        const inputAuthorName = document.querySelector("#inputAuthorName");
        const inputNameOfSite = document.querySelector("#inputNameOfSite");
        const inputTextPrimary_homePage = document.querySelector("#inputTextPrimary_homePage");

        const nameOfSite = document.querySelectorAll("#nameOfSite");
        const authorName = document.querySelectorAll("#authorName");
        const titlePrimary_homePage = document.querySelectorAll("#titlePrimary_homePage");
        const textPrimary_homePage = document.querySelectorAll("#textPrimary_homePage");

        // Prepara o objeto com as informações para enviar ao banco
        const configData = {
            nameOfSite: inputNameOfSite.value.trim(),
            authorName: inputAuthorName.value.trim(),
            titlePrimary_homePage: inputTitlePrimary_homePage.value.trim(),
            textPrimary_homePage: inputTextPrimary_homePage.value.trim()
        };

        try {
            // Envia para o Backend
            const response = await fetch('http://localhost:3000/api/config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(configData)
            });

            if (response.ok) {
                // Atualiza as tags na tela apenas se o envio for bem sucedido
                nameOfSite.forEach((element) => { element.textContent = configData.nameOfSite });
                authorName.forEach((element) => { element.textContent = configData.authorName });
                titlePrimary_homePage.forEach((element) => { element.textContent = configData.titlePrimary_homePage });
                textPrimary_homePage.forEach((element) => { element.textContent = configData.textPrimary_homePage });

                console.log("Configurações salvas com sucesso no banco!");
            } else {
                console.error("Erro ao salvar no banco.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    });
}

export async function pos({}) {
    const dates = await fetch("/");
    const res = await dates.json()

    return res;
}