 function signup(event) {
     event.preventDefault()
     const alertMsg = $('.alertMsg')
     alertMsg.html('')
     const registerInputs = $("input[class='registerInput']");
     let newUser = {};

     for (const input of registerInputs) {
         if (input.value.trim() === '') return alert('invalid input');

         //TODO check user name
         // if (input.id === 'id' && !!products.find(item => item.id === Number(input.value))) {
         //     return alert('duplicated user !');
         // }


         newUser[input.name] = input.value;
     }

     console.log(newUser)

     $.ajax({
         type: "post",
         url: `/auth/signup/register`,
         data: newUser,
         success(response) {
             console.log('msg is==>', response);
             alertMsg.html('user created successfully')
         },
         error(err) {
             console.log('msg is==>', err);
             alertMsg.html('fill out all fieleds')
         },
         async: false
     });

 }



 function login(event){
    event.preventDefault()
     const alertMsg = $('.alertMsg')
     alertMsg.html('')
     const registerInputs = $("input[class='registerInput']");

     let user = {}
     for (const input of registerInputs) {
        if (input.value.trim() === '') return alert('invalid input');

         user[input.name] = input.value;
    }

    $.ajax({
        type: "post",
        url: `/auth/login/register`,
        data: user,
        success(response) {
            console.log('msg is==>', response);
            alertMsg.html(response)
        },
        error(err) {
            console.log('msg is==>', err);
            alertMsg.html(err)
        },
        async: false
    });


    console.log(user)

 }