const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){

          this.userProfile.innerHTML = `<div class="info">
       <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                                       <div class="data">
                                       <h1>${user.name ?? 'Não possui nome cadastrado'}</h1>
                                   <p>${user.bio ?? 'Não possui bio cadastrada'}</p>
                                   <p>Seguidores: ${user.followers ?? 'Não possui Seguidores'}</p>
                                   <p>Seguindo: ${user.following ?? 'Não está seguindo'}</p>
                                   </div>
                                   </div>`
                                   
                                   

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens +=`<li><a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <div class="repo-details">
            <p>⭐: ${repo.stargazers_count}</p>
                    <p>🍴 : ${repo.forks_count}</p>
                    <p>👁️ s: ${repo.watchers_count}</p>
                    <p>🖥️ : ${repo.language ?? 'Não especificada'}</p>
                    </div>
            
            </li>` )
              
       if(user.repositories.length > 0) {
           this.userProfile.innerHTML +=  `<div class="repositories section">
                                               <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                               </div>`
        }
    },

    renderEvents(events) {
        const filteredEvents = events.filter(event => event.type === "CreateEvent" || event.type === "PushEvent").slice(0, 10);
        const eventsHtml = filteredEvents.map(event => {
            if (event.type === "PushEvent") {
                const commitMessages = event.payload.commits.map(commit => commit.message).join(', ');
                return `<li>Repositório: ${event.repo.name}, Mensagem de commit: ${commitMessages}</li>`;
            } else if (event.type === "CreateEvent") {
                return `<li>Repositório: ${event.repo.name}, Mensagem: Sem mensagem de commit</li>`;
            }
        }).join('');

        document.getElementById('user-events').innerHTML = `<ul>${eventsHtml}</ul>`;
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usúario não encontrado</h3>"
        document.getElementById('user-events').innerHTML = '';
    }
}

export {screen}