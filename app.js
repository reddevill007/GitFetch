window.addEventListener("load", function(){
    this.setTimeout(() => {
        this.document.querySelector(".loader").style.display="none";
    },3000) //3000ms = 3s
})


var form = document.getElementById('myForm');
const close = document.getElementById('close');
const result_not_found = document.getElementById('result_not_found');
const result_box = document.getElementById('result_box');
const close_details = document.getElementById('close_details');

close.onclick = ()=>{
    result_not_found.style.display = 'none';
}

close_details.onclick = ()=>{
    result_box.style.display = 'none';
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    var search = document.getElementById('search').value;
    var userName = search.split(' ').join('');

    fetch(`https://api.github.com/users/${userName}`)
    .then((result) => result.json())
    .then((data) => {
        console.log(data)
        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('name').innerHTML = data.name;
        document.getElementById('username').innerHTML = data.login;
        document.getElementById('id').innerHTML = userName;
        document.getElementById('bio').innerHTML = data.bio;
        document.getElementById('visit').href = data.html_url;
        document.getElementById('blog').href = data.blog;
        document.getElementById('tweet').href = `https://twitter.com/${data.twitter_username}`;
        document.getElementById('follow').innerHTML = `<i class="fas fa-users"></i> Followers: ${data.followers} Following: ${data.following}`;
        document.getElementById('repo').innerHTML = `<i class="fas fa-book"></i> Repositories: ${data.public_repos}`;
        if(data.blog == "") {
            document.getElementById('blog').style.display="none";
        } 
        
        if(data.twitter_username == null) {
            document.getElementById('tweet').style.display="none";
        }

        if(data.login == undefined) {
            document.querySelector(".loader").style.display="flex";
            setTimeout(() => {
                document.querySelector(".loader").style.display="none";
            },1000) 
            result_not_found.style.display = 'flex';
        } else {
            document.querySelector(".loader").style.display="flex";
            setTimeout(() => {
                document.querySelector(".loader").style.display="none";
            },1000) 
            result_box.style.display = 'flex';
        }
    })
})