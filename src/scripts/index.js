import { getUser } from './service/user.js'
import { getRepositories} from './service/repositories.js'
import { getEvents } from './service/event.js'


import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

document.getElementById('btn-search'). addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})



document.getElementById('input-search'). addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usúario do GitHub')
        return true
    }
}


async function getUserData(userName) {
    try {
        const userResponse = await getUser(userName);

        if (userResponse.message === "Not found") {
            screen.renderNotFound();
            return;
        }

        const repositoriesResponse = await getRepositories(userName);
        const eventsResponse = await getEvents(userName);

        user.setInfo(userResponse);
        user.setRepositories(repositoriesResponse);

        screen.renderUser(user);
        screen.renderEvents(eventsResponse);
    } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
        screen.renderNotFound(); // Pode renderizar mensagem de erro genérica
    }
}



