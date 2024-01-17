const message = document.querySelector('.message')
const profile = document.querySelector('.profile')

function User(object){
    this.imageProfile = object.user.avatar_url
    this.name = object.user.name
    this.username = object.user.login
    this.followers = object.user.followers
    this.following = object.user.following
    this.location = object.user.location
    this.repositories = object.repos
}

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

async function renderUserData(userGithub){
    message.style.display = 'none'
    profile.style.display = 'block'

    document.querySelector('.image-profile').setAttribute('src', userGithub.imageProfile)

    document.querySelector('.name').innerText = userGithub.name

    document.querySelector('.username').innerText = userGithub.username

    document.querySelector('.followers').innerText = userGithub.followers

    document.querySelector('.following').innerText = userGithub.following

    document.querySelector('.address').innerText = userGithub.location

    document.querySelector('.repositories-number').innerText = userGithub.repositories.length
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