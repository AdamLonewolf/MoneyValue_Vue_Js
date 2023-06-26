<script>
export default {
    data(){
        return{ 
          currencies: [],
          //On récupère la valeur de ces 3 champs via ces éléments
          fromCurrency:"", 
          toCurrency:"",
          convertRate:""
        }
    },
    props:['id'],
    methods:{
        async getCurrencies(){
            var link = `${this.url}currencies/list`;
             this.currencies = await(await(fetch(link, {
                method:"get"
            }))).json(); //on envoie directement les informations dans l'objet pairs
        },

    //On renvoie toutes les informations de la paire sélectionnée

        async getData(id){
           let res = await(await fetch(`${this.url}pair/${id}`)).json();
           this.fromCurrency = res.data.from_currency_id;
           this.toCurrency = res.data.to_currency_id;
           this.convertRate = res.data.convert_rate;
        },

        async submit(id){
            //Si id est égale à 0, ça veut dire qu'il s'agit de la création d'une paire, dans le cas contraire, il s'agit de la modification d'une paire existante.
            if(id == 0){
                var link = `${this.url}pairs/create`;
            } else {
                link = `${this.url}pairs/edit/${id}`;
            }

            var res = await(await(fetch(link, {
                method:"post",
                headers:{
                        'Content-Type' : "application/json"
                    },
                    body: JSON.stringify({
                        //On renseigne les valeurs de chaque élément
                       'from_currency_id' : this.fromCurrency,
                       'to_currency_id': this.toCurrency,
                       'convert_rate': this.convertRate
                    })
            }))).json()

             if(res.status == "OK"){
                    this.$router.push('/lists') //si c'est bon, on renvoie l'admin sur le dashboard
                } 
        }

    },

    

    mounted:function(){
    this.getCurrencies();

    //Si on reçoit la valeur de l'id, on appelle cette propriété une fois la page chargée.
     if(this.id){
            this.getData(this.id);
        }
  }
    
}
</script>

<template>
    <!--Quand je clique sur le bouton d'envoi du formulaire, je bloque le comportement par défaut de ce dernier afin d'envoyer mes informations-->
    <form class="pair-container" @submit.prevent="submit(this.id)"  action="">
    
        <div class="indication" >
            <h1 v-if="id == 0">Créer une nouvelle paire</h1>
            <h1 v-else>Modification d'une paire</h1>
            <h4>Veuillez renseigner les champs ci-dessous</h4>
        </div>
        <div class="group-form group-form-1">
            <label for="from_currency">Monnaie Source</label>
            <select class="form-select my-1" v-model="fromCurrency"> 
               <option v-for="currency in currencies.data" :key="currency.id" :value="currency.id">{{ currency.currency_code }}
                 </option>
            </select>
        </div>
        <div class="group-form group-form-2">
            <label for="from_currency">Monnaie Cible</label>
            <select class="form-select my-1" v-model="toCurrency">
                 <option v-for="currency in currencies.data" :key="currency.id" :value="currency.id">{{ currency.currency_code }}
                 </option>
            </select>
        </div>
        <div class="group-form group-form-3">
            <label for="from_currency">Taux de conversion</label>
              <input type="number" id="convert_rate" v-model="convertRate" name="convert_rate" placeholder="taux de conversion.." step="any">
        </div>
         <button type="submit" class="btn-edit mt-5" v-if="id == 0">Créer une paire</button>
        <button type="submit" class="btn-edit mt-5" v-else>Enregistrer</button>
    </form>
</template>

<style>
@import '/src/assets/style/root.css'; 

body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: linear-gradient(to right, #4481eb 0%, #04befe 100%);
    height: 100vh;
}

.form-select{
    border: 2px solid var(--border-black);
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

.pair-container{
    width: 400px;
    height: 580px;
    position: absolute;
    border-radius: 12px;
    margin: 0 auto;
    padding: 10px 25px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--primary-color);
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
    font-size: 30px;
}
.indication h4{
    color: grey;
    margin: 20px 0px;
    font-family: var(--regular);
    font-size: 16px;
}

.group-form input{
    border: 2px solid var(--border-black);
    height: 40px;
    border-radius: 6px;
    padding:0px 10px;
    color: var(--main-text);
    font-family: var(--regular);
}

.btn-edit {
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
  
  .btn-edit:hover {
    background-color: #4481eb;
    color: #fff;
    transform: translateY(-5px);
  }
</style>