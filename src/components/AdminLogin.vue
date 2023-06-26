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

            //Si tout se passe bien, on stocke le token de l'admin dans la session du navigateur et on le dirige vers son dashboard

            if(res.status == "OK"){
                sessionStorage.setItem("User_token",res.token);
                this.$router.push('/dashboard');
            } else {
                alert('Une erreur est survenue.');
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

<style src="../assets/style/login.css">

</style>