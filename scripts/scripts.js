function User(object){
    this.imageProfile = object.user.avatar_url
    this.name = object.user.name
    this.username = object.user.login
    this.followers = object.user.followers
    this.following = object.user.following
    this.location = object.user.location
    this.repositories = object.repos.length
}



async function searchUserOnGithub(username){
    let url = `https://api.github.com/users/${username}`

    let datesUser = await axios.get(url)
    let repos = await axios.get(datesUser.data.repos_url)

    return {user: datesUser.data, repos: repos.data}
}

async function renderUserData(){
    let user = new User(await searchUserOnGithub('gustavoguanabara'))

    document.querySelector('.image-profile').setAttribute('src', user.imageProfile)

    document.querySelector('.name').innerText = user.name

    document.querySelector('.username').innerText = user.username

    document.querySelector('.followers').innerText = user.followers

    document.querySelector('.following').innerText = user.following

    document.querySelector('.address').innerText = user.location

    document.querySelector('.repositories-number').innerText = user.repositories
}

renderUserData()