const message = document.querySelector('.message')
const profile = document.querySelector('.profile')

//Eventos
document.querySelector('.search-btn').onclick = () => searchUser()

// Métodos

function checkUser(){
    let searchText = document.querySelector('.search-text')
    let username = searchText.value.trim()

    if(username.length){
        searchText.value = ''
        return username
    }

    return false
}

async function searchUser(){
    let userName = checkUser()

    if(userName){
        try{
            let user = await getUserOnGithub(userName)
            console.log(user)

            renderUserData(user)

        } catch(error){
            renderError(error)
        }
    }
}

async function getUserOnGithub(username){
    try{
        let response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
        
        if(!response.ok){
            if(response.status === 404) throw new Error("Usuário não encontrado.")

            if(response.status === 403 || response.status === 429){
                let remaining = response.headers.get("x-ratelimit-remaining")

                if(remaining === "0"){
                    let reset = new Date(response.headers.get("x-ratelimit-reset") * 1000);
                    throw new Error(`Limite de requisições atingido. Tente após ${reset.toLocaleTimeString()}.`);
                }

                throw new Error("Acesso negado ou muitas requisições. Tente novamente em instantes.");
            }

            if (response.status >= 500) throw new Error("A GitHub está instável. Tente novamente mais tarde.");

            throw new Error(`Erro inesperado (${response.status}).`);
        }

        let user = await response.json()

        return user
    } catch(error){
        if(error instanceof TypeError) throw new Error("Falha de conexão. Verifique sua internet.")
        throw error
    }
}

async function renderUserData(userGithub){
    message.style.display = 'none'
    profile.style.display = 'block'

    document.querySelector('.image-profile').setAttribute('src', userGithub.avatar_url)

    document.querySelector('.name').innerText = userGithub.name

    document.querySelector('.username').innerText = userGithub.login

    document.querySelector('.followers').innerText = userGithub.followers

    document.querySelector('.following').innerText = userGithub.following

    document.querySelector('.address').innerText = userGithub.location

    document.querySelector('.repositories-number').innerText = userGithub.public_repos
}

function renderError(error){
    profile.style.display = 'none'
    message.style.display = 'block'
    message.innerText = `Erro ao buscar usuario: ${error.message}`
}

