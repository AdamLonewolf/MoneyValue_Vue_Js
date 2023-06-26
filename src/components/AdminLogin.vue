<script>

export default {
    data(){
        return{ 
            //On récupère les données du formulaire dans ces objets 
            password: "",
            email: ""
        }
    },
    
    methods: {
        //On fait une méthode qui va envoyer les données du formulaire quand on clique sur le bouton de validation

        async submitForm(){

            var link = `${this.url}users/login`

            //On envoie une requête contenant les données de notre formulaire et on attend sa réponse.

            var res = await(await fetch(link,{
                method:"post",
                    headers:{
                        'Content-Type' : "application/json" //On précise le type du contenu 
                    },
                    body: JSON.stringify({
                        //On envoie les données sous format json
                        "email": this.email,
                        "password":this.password,
                    })
            })).json();

            console.log(res);

            //Si tout se passe bien, on stocke le token de l'admin ainsi que son id dans la session du navigateur et on le dirige vers son dashboard

            if(res.status == "OK"){
                sessionStorage.setItem("User_token",res.token);
                sessionStorage.setItem("User_id",res.user.id); 
                this.$router.push('/dashboard');
                alert(res.message);
            } else {
                alert('Une erreur est survenue.');
                alert(res.message);
            }
        }
    }
}
</script>

<template>
    <!--Quand je clique sur le bouton d'envoi du formulaire, je bloque le comportement par défaut de ce dernier afin d'envoyer mes informations-->
    <form class="login-container" @submit.prevent="submitForm" action="">
         <div class="col">
            <div class="logo-brand">
                <img src="../assets/images/coin-2.png" alt="coin">
                <p>Money Value</p>
            </div>
        </div>
        <div class="indication">
            <h1>Connexion à un compte</h1>
            <h4>Veuillez remplir les champs ci-dessous</h4>
        </div>
        <div class="group-form group-form-1">
            <label for="email">Adresse Mail</label>
            <input type="email" id="email" v-model="email" name="email" placeholder="votre nom d'utilisateur...">
        </div>
        <div class="group-form group-form-2">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" name="password" placeholder="votre mot de passe...">
            <span class="error"></span>
        </div>
        <button id="btn-login" type="submit"  class="btn-login my-4">Se connecter</button>
    </form>
</template>

<style>

    @import '/src/assets/style/root.css'; 

body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: linear-gradient(to top, #4481eb 0%, #04befe 100%);
    height: 100vh;
}

.login-container{
    width: 400px;
    height: 500px;
    position: absolute;
    border-radius: 12px;
    margin: 0 auto;
    padding: 10px 25px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--primary-color);
}

.logo-brand{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 22px 0px 0px 0px;
}

.logo-brand p{
    margin-bottom: 0px;
    margin-left: 6px;
    color: var(--text-black);
    font-family: var(--bold);
    font-size: 25px;
}

.logo-brand img{
    width: 30px;
    height: auto;
}

.indication{
    margin: 40px 0px;
}

.indication h1,h4{
    text-align: center;
}

.indication h1{
    color: var(--text-black);
    font-family: var(--bold);
    font-size: 24px;
}
.indication h4{
    color: var(--text-black);
    font-family: var(--regular);
    font-size: 18px;
}


.group-form{
    display: flex;
    flex-direction: column !important;
}

.group-form-1{
    margin-bottom: 15px;
}

.group-form-2{
    margin-bottom: 15px;
}

.group-form label{
    color: var(--text-black);
    font-size: 18px;
    margin-bottom: 10px;
    font-family: var(--bold);
}

.group-form input{
    border: 2px solid var(--border-black);
    height: 40px;
    border-radius: 6px;
    padding:0px 10px;
    color: var(--main-text);
    font-family: var(--regular);
}

.group-form input:focus{
    background-color: #efe9e9;
}


/* .error{
    font-size: 14px;
    color: var(--special-red);
    font-style: italic;
} */


.btn-login {
    display: block;
    margin: 0 auto;
    padding: 1.3em 3em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: var(--text-white);
    background-color: var(--secondary-color);
    border: none;
    border-radius: 45px;
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
  }
  
  .btn-login:hover {
    background-color: #4481eb;
    color: #fff;
    transform: translateY(-5px);
  }
</style>