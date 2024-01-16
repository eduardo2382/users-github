function User(object){
    this.imageProfile = object.user.avatar_url
    this.name = object.user.name
    this.username = object.user.login
    this.followers = object.user.followers
    this.following = object.user.following
    this.location = object.user.location
    this.repositories = object.repos
}

async function searchUserOnGithub(username){
    let url = `https://api.github.com/users/${username}`

    let datesUser = await axios.get(url)
    let repos = await axios.get(datesUser.data.repos_url)

    return {user: datesUser.data, repos: repos.data}
}

async function renderUserData(){
    var userGithub = new User(await searchUserOnGithub('eduardo2382'))

    document.querySelector('.image-profile').setAttribute('src', userGithub.imageProfile)

    document.querySelector('.name').innerText = userGithub.name

    document.querySelector('.username').innerText = userGithub.username

    document.querySelector('.followers').innerText = userGithub.followers

    document.querySelector('.following').innerText = userGithub.following

    document.querySelector('.address').innerText = userGithub.location

    document.querySelector('.repositories-number').innerText = userGithub.repositories.length
}

renderUserData()