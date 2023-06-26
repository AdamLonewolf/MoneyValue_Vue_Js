<script>
import CurrencyList from '../../components/CurrencyList.vue'
export default {
    data() {
        return{
          //Je récupère le token de l'utilsateur stocké dans la session du navigateur.
         user_id: sessionStorage.getItem('User_id'), //On récupère l'id de l'admin
        }
    },

  components:{
        CurrencyList
    },
  methods:{
    //Fonction pour se déconnecter 

      async logout(){
       //Je stocke l'id dans une variable
       var id = this.user_id;
       var link = `${this.url}users/logout/${id}`
        
       var res = await(await(fetch(link,{
        method:"get",
       }))).json(); 

       if(res.status == "OK"){
        //Si la déconnexion est effectuée avec succès, on écrase les token et l'id de l'admin dans la session du navigateur
          sessionStorage.removeItem('User_id');
          sessionStorage.removeItem('User_token');
          this.$router.push('/'); //Si c'est bon, on dirige l'admin sur la page d'accueil
       }  
      }

  }
  
}
</script>

<template>
  <!-- Navbar -->

   <nav id="my-navbar" class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <div class="logo-brand">
        <img src="/images/coin-2.png" alt="coin">
        <p class="logo-marque">Money Value</p>
      </div>
       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-ul navbar-nav me-auto mx-5">
          <li class="nav-item">
             <router-link :to="`/dashboard`" class="custom-link"><a class="nav-link">Paires</a></router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/dashboard/currency`" class="custom-link"><a class="nav-link">Devises</a></router-link>
          </li>
        </ul>
        <div class="btn-logout-container">
          <button id="btn-logout" class="btn-logout" @click="logout">
            <i class="fa-solid fa-right-from-bracket mx-2"></i>
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Banner -->

     <div class="bg-dark banner d-flex justify-content-center align-items-center" style="height: 350px !important; background-image:url(/images/banner2.jpg); background-position:center center; background-repeat:no-repeat; background-size:cover; position: relative;">
        <div class="overlay" style="width:100%; height:100%; background-color:#181818; position:absolute; opacity:0.4; z-index:1000"></div>
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder" style="z-index: 1000; position:relative">Liste des Devises</h1>
            </div>
        </div>
    </div>

  <div class="container-fluid">
     <CurrencyList></CurrencyList>
  </div>
  
  <footer>
      <div class="container-fluid container-footer">
        <p>© MoneyValue - 2023</p>      
      </div>  
    </footer>
</template>

<style src="">

@import '/src/assets/style/root.css'; 

body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: #F6F1E9;
    height: 100vh;
}

#my-navbar{
    background-color: var(--tertiairy-color);
}

#my-navbar .logo-brand{
    display: flex;
    justify-content: center;
    align-items: center;
}

#my-navbar .logo-brand img{
    width: 30px;
    height: auto;
}

#my-navbar .logo-brand a{
  text-decoration: none;
}

#my-navbar .logo-marque{
    margin-bottom: 0px;
    margin-left: 6px;
    color: var(--text-white);
    font-family: var(--bold);
    font-size: 25px;
    margin-top: 0px !;
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


.navbar-collapse{
 justify-content: end;
}

.nav-link{
  font-size: 18px;
  color: var(--text-white);
  font-family: var(--bold);
  margin-right: 15px;
}



.btn-logout {
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
  
  .btn-logout:hover {
    background-color: var(--danger-color);
    color: #fff;
  }

  a{
    text-decoration: none;
  }
</style>