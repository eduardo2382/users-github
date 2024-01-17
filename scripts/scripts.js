const message = document.querySelector('.message')
const profile = document.querySelector('.profile')

//Eventos
document.querySelector('.search-btn').onclick = () => checkUser()

// Métodos

async function checkUser(){
    let searchText = document.querySelector('.search-text')
    let userFieldWithText = searchText.value.length || false

    if(userFieldWithText){
        await searchUserOnGithub(searchText.value)
        searchText.value = ''
    }
}

async function searchUserOnGithub(username){
    try{
        const datesUser = await axios.get(`https://api.github.com/users/${username}`)
        const repos = await axios.get(datesUser.data.repos_url)

        renderUserData({user: datesUser.data, repos: repos.data})
    } catch(e){
        profile.style.display = 'none'
        message.style.display = 'block'
        message.innerText = `Erro ao buscar usuario '${e.response.status}'`
    }
}

async function renderUserData(userGithub){
    message.style.display = 'none'
    profile.style.display = 'block'

    document.querySelector('.image-profile').setAttribute('src', userGithub.user.avatar_url)

    document.querySelector('.name').innerText = userGithub.user.name

    document.querySelector('.username').innerText = userGithub.user.login
    console.log(userGithub.user)

    document.querySelector('.followers').innerText = userGithub.user.followers

    document.querySelector('.following').innerText = userGithub.user.following

    document.querySelector('.address').innerText = userGithub.user.location

    document.querySelector('.repositories-number').innerText = userGithub.repos.length
}

