$("form#formSignin").submit(function(e){
    e.preventDefault();
    console.log(e,'e')
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');

    axios.post('/api/signin', {email: email, password: password}).then((response)=>{
        if(response.data.status){
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("jwtToken", response.data.token);
            }
           // console.log(response.data);
           alert(response.data.message);
           window.location='/home';

        }else{
            alert(response.data.message);
        }
    })
});
