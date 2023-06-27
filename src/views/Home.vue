<script>
export default {
  data() {
     return{
        pairs: [],
        pairId:"", 
        quantity:0,
        amount:"",
        result: ""
     }
  },

  methods:{
        async getPairs(){
            var link = `${this.url}pairs/list`;
             this.pairs = await(await(fetch(link, {
                method:"get"
            }))).json(); //on récupère la liste des devises
        },

     //Méthode qui va retourner le symbole de la devise (je parle du code de la devise)
    
      getCurrencySymbol(pairId){
        var pair = this.pairs.data.find((pair) => pair.id === pairId) //On recherche dans la liste des paires une paire qui a un id identique à celle selectionnée dans l'outil de conversion
        
        //si on la trouve, on retourne le le code de la monnaie cible
        if(pair){
          return pair.to_currency_code;
        } else {
          return ''; // Si la paire n'est pas trouvée, renvoie une chaîne vide
        }
     },

      //Méthode qui va afficher le résultat

      updateResult(){
        this.result = Math.round(this.amount) + " " + this.getCurrencySymbol(this.pairId)
      } ,

    //Méthode qui va permettre de faire la conversion 
        async convert(){
            var convertLink = `${this.url}convert/${this.pairId}` //On renseigne l'id de la paire selectionnée
             var res = await(await(fetch(convertLink, {
                method:"post",
                headers:{
                        'Content-Type' : "application/json"
                    },
                    body: JSON.stringify({
                        //On renseigne les valeurs de chaque élément
                        "quantity" : this.quantity
                    })
            }))).json()

        //Si c'est bon, on retourne une alerte contenant le message de succès si non, on retourne le message d'erreur
            if(res.status == "OK"){
              alert(res.message); 
              this.amount = res.data //On retourne le résultat dans amount
            } else {
              alert(res.message); 
            }

            this.updateResult(); //on appelle la fonction quand on finit la conversion
        }
    },

    mounted:function(){
    this.getPairs();
  }
};



</script>

<template>
  <header>
    <nav id="my-navbar" class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <div class="logo-brand">
          <img src="src/assets/images/coin-2.png" alt="coin" />
          <router-link :to="`/`"
            ><a class="logo-marque">Money Value</a></router-link
          >
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="btn-logout-container">
            <router-link :to="`/login`">
              <button id="btn-login" class="btn-login">
                <i class="fa-solid fa-right-to-bracket mx-2"></i>
                Se connecter
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Banner -->

    <div class="banner" style="">
      <div class="container-fluid banner-container">
        <div class="text-center banner-text text-white">
          <h1
            class="display-5 fw-bolder"
            style="z-index: 1000; position: relative"
          >
            Utilisez dès à présent notre api de conversion publique et gratuite
            !
          </h1>
          <a class="call-to-action" href="#section">Testez dès à présent !</a>
        </div>
        <div class="img-banner">
          <img src="src/assets/images/currency.png" alt="currency" />
        </div>
      </div>
    </div>
  </header>

  <main>
    <section id="section">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div class="section-title">
              <h3>Outil de conversion</h3>
            </div>
            <div class="converter d-flex justify-content-center align-items-center">
              <form action="" >
                <h3 class="text-center titre-converter">Convertisseur de devises</h3>
                <div class="group-form group-form-1">
                  <label for="from_currency">Montant</label>
                  <input type="number" id="quantity" v-model="quantity" name="quantity" placeholder="Le taux de conversion"/>
                </div>
                <div class="currencies d-flex">
                  <div class="group-form group-form-2">
                    <label for="from_currency">Conversion de -> à </label>
                    <select class="form-select my-1" v-model="pairId">
                        <option v-for="pair in pairs.data" :key="pair.id" :value="pair.id">
                          {{pair.from_currency_code }} => {{pair.to_currency_code}}
                        </option>
                    </select>
                  </div>
                </div>
                <p class="amount">Montant : {{result}} </p>
                <a class="convert" @click="convert()">Convertir</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer>
      <div class="container-fluid container-footer">
        <p>© MoneyValue - 2023</p>      
      </div>  
    </footer>
</template>

<style>
@import "/src/assets/style/root.css";

html {
  scroll-behavior: smooth;
}



body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: #fff;
  height: 100vh;
}

.titre-converter{
    position: relative;
    bottom: 20px;
    font-family: var(--bold);
}
.amount{
    color: var(--tertiairy-color);
    font-size: 18px;
    font-family: var(--bold);
}
#my-navbar {
  background-color: var(--tertiairy-color);
}

#my-navbar .logo-brand {
  display: flex;
  justify-content: center;
  align-items: center;
}

#my-navbar .logo-brand img {
  width: 30px;
  height: auto;
}

#my-navbar .logo-brand a {
  text-decoration: none;
}

#my-navbar .logo-marque {
  margin-bottom: 0px;
  margin-left: 6px;
  color: var(--text-white);
  font-family: var(--bold);
  font-size: 25px;
}

#section {
  background: linear-gradient(to top, #4481eb 0%, #04befe 100%);
  width: 100%;
  height: 100vh;
  padding: 30px;
}

.converter {
  width: 600px;
  height: 460px;
  position: relative;
  border-radius: 12px;
  margin: 0 auto;
  padding: 10px 25px;
  background-color: var(--primary-color);
  top: 20%;
}

.section-title h3 {
  font-family: var(--bold);
  color: var(--text-white);
  font-size: 24px;
}

.banner {
  width: 100%;
  height: 350px !important;
  background-color: var(--primary-color);
  position: relative;
}

.img-banner {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-banner img {
  width: 270px;
  height: auto;
}

.banner .banner-text h1 {
  color: var(--text-black);
  text-align: left;
}

.banner-text {
  width: 50%;
}

/* inspired form gumroad website */
.call-to-action,.convert {
  color: #fff;
  border: 1px solid var(--text-black);
  border-radius: 4px;
  padding: 0.8em 2em;
  cursor: pointer;
  font-family: var(--bold);
  background: var(--text-black);
  transition: 0.2s;
  float: left;
  margin: 20px 0px;
  text-decoration: none;
}

.call-to-action:hover,.convert:hover {
  color: var(--hover-text);
  transform: translate(-0.25rem, -0.25rem);
  background: var(--secondary-color);
  box-shadow: 0.25rem 0.25rem var(--text-black);
}

.call-to-action:active {
  transform: translate(0);
  box-shadow: none;
}

.banner-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
}

.navbar-collapse {
  justify-content: end;
}

.btn-login {
  display: block;
  padding: 1.2em 2.6em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: var(--text-black);
  background-color: var(--primary-color);
  border: none;
  border-radius: 10px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

.btn-login:hover {
  background-color: var(--secondary-color);
  color: #fff;
}

a {
  text-decoration: none;
}

.form-select{
    border: 2px solid var(--border-black);
    width: 200px;
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

   footer {
            width: 100%;
            height: 55px;
            background-color: var(--primary-color);
            color: var(--text-black);
            padding: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        
        footer p{   
            font-size: 14px;
            text-align: center;
            font-family: var(--bold);
            text-align: center !important;
            margin: 0px 0px 0px !important; 
            position: relative;
            right: 15px;
        }

        footer .logo-brand a{
            font-size: 16px;
        }
        
        footer .social-media i{
            font-size: 25px;
        }
</style>
