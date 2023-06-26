<script>
import List from '../components/PairList.vue';
export default {
    data() {
        return{

        }
    },

    components:{
      List
    }
}
</script>

<template>
  <!-- Navbar -->
<nav id="my-navbar" class="navbar">
  <div class="container-fluid">
     <div class="logo-brand">
        <img src="src/assets/images/coin-2.png" alt="coin">
        <a class="logo-marque" href="#">Money Value</a>
    </div>
    <div class="btn-logout-container">
    <button id="btn-logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket mx-2"></i>Se déconnecter</button>
  </div>
  </div>
  
</nav>

  <!-- Banner -->

     <div class="bg-dark banner d-flex justify-content-center align-items-center" style="height: 350px !important; background-image:url(src/assets/images/banner.jpg); background-position:center center; background-repeat:no-repeat; background-size:cover; position: relative;">
        <div class="overlay" style="width:100%; height:100%; background-color:#181818; position:absolute; opacity:0.4; z-index:1000"></div>
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder" style="z-index: 1000; position:relative">Mon dashboard</h1>
            </div>
        </div>
    </div>

  <List/>
</template>

<style src="">

@import '/src/assets/style/root.css'; 

body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: var(--primary-color);
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
</style>