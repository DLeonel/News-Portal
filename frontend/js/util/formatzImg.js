export async function formatImg({ idOfButton, id}) {
    //function Alterar foto de perfil... getFileOfUsers ()
    const btnInputFile = document.querySelector(`#${idOfButton}`);
    btnInputFile.addEventListener("click", async () => {

        try {
            await window.showOpenFilePicker()
                .then(async (fileSystemHandle) => {

                    if (fileSystemHandle[0].kind === 'file') {
                        const file = await fileSystemHandle[0].getFile();

                        if (file.type.split('/').includes('image')) {
                            infoErrorUser({ error: false , containerParent: id});
                            createURLImg(file)
                        } else infoErrorUser({ error: true, containerParent: id});

                    } else console.info(`O Ficheiro ":${fileSystemHandle[0].kind}" não é valido!`)

                }).catch(async (ErrorEvent) => {
                    console.error(`Requisição abortada pelo usuário: ${ErrorEvent}`);
                });

        } catch (error) {
            console.error(`Erro ao obter autorização do usuario: ${error}`);
        }
    });
}


//Cria a 'url' temporaria referenciando o File na memória...
const createURLImg = (file) => {
    const url = URL.createObjectURL(file);
    document.querySelector("#profilePhoto").src = url;
};

//Informar o usuario em caso de erro no carregamento...
const infoErrorUser = ({ error, containerParent }) => {
    const elementParent = document.querySelector(`#${containerParent}`);
    //Verifica se a tag "p" com o aviso já exite... 
    const errorMessage = [...elementParent.children].filter(currentChild => {
        if (currentChild.id.includes("errorMessage")) return true
    });

    if (error && errorMessage.length === 0) { //cria a tag "p" 
        const p = document.createElement("p");
        p.textContent = "Arquivo inválido: carregue uma imagem."
        p.style.color = '#ff002bdc';
        p.style.fontSize = '0.75rem';
        p.style.marginTop = "0.5rem";
        p.id = "errorMessage";
        elementParent.appendChild(p)
    } else if (!error && errorMessage.length !== 0) {
        elementParent.removeChild(elementParent.querySelector("#errorMessage"));
    }
}