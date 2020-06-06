
$("form#formSignup").submit(function(e){
    e.preventDefault();
    console.log(e,'e')
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contact = document.getElementById('contact').value;
    var password = document.getElementById('password').value;

    console.log(name,email,contact,password);

    axios.post('/api/signup', {name: name, email: email, contact: contact, password: password}).then(function(doc){
        if(doc.data.status){
            alert(doc.data.message);
            window.location='/';
        }else{
            alert(doc.data.message);
        }
    });
});
