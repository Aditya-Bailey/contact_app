var username = '', useremail='';
function saveContact(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contact = document.getElementById('contact').value;

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');

    axios.post('/api/addContact',{name:name,email:email,contact: contact})
    .then((response)=>{
        if(response.data.status){
            contactList();
        }else
        
            {
                alert(response.data.message);
            }
        
    }
    );
}


function contactList(){
    var len = '',name='',email="",contact="",html='',admin='';
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');

    axios.post('/api/fetchContact').then((response)=>{
       len = response.data.contact.length;
      var reverseArray = response.data.contact.reverse();
       // console.log('arraylength',len);

        for(i=0;i<len;i++){
            name=reverseArray[i].name;
            email=reverseArray[i].email;
            contact = reverseArray[i].contact;
            
            html += `<tr>
            <td contenteditable='false' class="row${i}" id="name${i}">${name}</td>
            <td contenteditable='false' class="row${i}" id="email${i}">${email}</td>
            <td contenteditable='false' class="row${i}" id="contact${i}">${contact}</td>
            <td><button id="btne${i}" onclick="editRow(this.id)">Edit</button></td>
            <td><button id="btndel${i}" onclick="deleteRow(this.id)">Delete</button></td>
            </tr>`;
            
            document.getElementById('contactTableBody').innerHTML = html;
            
        }
    });
}

function editRow(id){
    //   console.log('id',id.slice(3));
    var j=id.slice(4);
    document.getElementsByClassName(`row${j}`)[0].setAttribute("contenteditable","true");
    document.getElementsByClassName(`row${j}`)[1].setAttribute("contenteditable","true");
    document.getElementsByClassName(`row${j}`)[2].setAttribute("contenteditable","true");
    document.getElementById(`name${j}`).focus();
    
    oldemail = document.getElementById(`email${j}`).innerHTML;
    document.getElementById(id).innerText='Update';
    document.getElementById(id).removeAttribute("onclick");
    document.getElementById(id).setAttribute('onclick','updateRow(this.id)'); 

    }

    function updateRow(id){
        var k=id.slice(4);  

        var name = document.getElementById(`name${k}`).innerHTML;
        var email = document.getElementById(`email${k}`).innerHTML;
        var contact = document.getElementById(`contact${k}`).innerHTML;

       axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
       
        axios.post('/api/updateContact',{name:name,email:email,contact:contact,oldemail:oldemail})
        .then((response)=>{
            console.log(response);
            if(response.data.status)
            {
                contactList();
                alert(response.data.message);
               
            }
            else
            {
                alert(response.data.message);
            }
        },(e)=>{
            alert(response.data.message);
        }); 
    }

    function deleteRow(id){
        var k=id.slice(6);
        var email =  document.getElementById(`email${k}`).innerHTML;
        //console.log('sraray',k,email);
        // var retrievedObject = localStorage.getItem('testObject');
        // var dat = JSON.parse(retrievedObject);
        // var usermail = dat.useremail;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
    
        axios.post('/api/deleteContact',{email}).then((res)=>{
            if(res.data.status){
                contactList();
                alert(res.data.message);
            }else{
                alert(res.data.message);
            }
        },(e)=>{
            alert(res.data.message);
        })
        }

        function logout(){

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
            console.log('aaaaa');
            axios.get('/api/signout').then(function(res){
                
                if(res.data.status)
              return  location.reload('/signup');
            });
        }

        function profile(){
            window.location='/profile';
        }

        
    