<script>
export default {
    data() {
        return{
            //Ce objet est un tableau qui va stocker les infos envoyés par l'api
            currency:[],
            page:1,
            totalPage: ""
        }
    },

    watch:{
        page(){
            this.getData();
        }
    },
    methods:{
        async getData(){
            var link = `${this.url}currencies/list/${this.page}`;
            this.currency = await(await(fetch(link, {
                method:"get"
            }))).json(); //on envoie directement les informations dans l'objet pairs
            this.totalPage = this.currency.totalPage;
            console.log(this.currency);
        },

        //Fonction pour supprimer une paire 

        async deletePair(id){
            var deletelink = `${this.url}currency/delete/${id}`
            var res = await(await(fetch(deletelink,{
                method: "delete"
            }))).json();
            if(res.status == "OK"){
                this.currency.data = this.currency.data.filter((currency)=>currency.id != id) //Si tout se passe bien, on filtre la liste des paire et on met de côté tous ceux qui n'ont pas l'id selectionné.
                console.log(res);
            }
        },
    
    },

    //Une fois la page montée, on appelle directement la fonction getData()
    mounted:function(){
    this.getData();
  }
}
</script>


<template>

    <div class="btn-add-container d-flex justify-content-end align-items-center">
        <router-link :to="`/currencyform/`" class="custom-link">
            <button class="add-btn">
                <i class="fa-solid fa-plus mx-2"></i>
                Ajouter une nouvelle devise
            </button>
        </router-link>
    </div>
    <table id="table" class="table table-striped table-responsive">
    <thead class="table-dark">
        <tr>
            <th scope="col">id</th>
            <th scope="col">Code de la monnaie</th>
            <th scope="col">Nom de la monnaie</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="currency in currency.data" :key="currency.id">
            <th scope="row">{{currency.id}}</th>
            <td :id="currency.id" class="pairs">{{currency.currency_code}}</td>
            <td :id="currency.id" class="pairs">{{currency.currency_name}}</td>
            <td>
              <div class="action-btn d-flex align-items-center">
                 <router-link :to="`/currencyform/${currency.id}`">
                    <button class="action edit-btn">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </router-link>
                 <button class="action delete-btn" @click="deletePair(currency.id)">
                    <i class="fa-solid fa-trash-can"></i>
                 </button>
              </div>
            </td>
        </tr>
    </tbody>
    </table>
        <div class="d-flex justify-content-center align-items-center">
            <vue-awesome-paginate
            :current-page="page"
            :total-items="totalPage*10"
            :max-pages-shown="5"
            v-model="page"
            />
         </div>
</template>

<style>
    @import '/src/assets/style/root.css'; 

    .action{
        width: 35px;
        height: 35px;
        border: none;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        transition-duration: .3s;
    }
    
    .edit-btn{
        background: var(--secondary-color);
        color: var(--text-white);
        margin-right: 15px;
    }

    a{
    text-decoration: none;
    }

    .add-btn{
        display: block;
        padding: 1.2em 2em;
        font-size: 12px;
        margin: 15px 0px;
        text-transform: uppercase;
        letter-spacing: 2.5px;
        font-weight: 500;
        color: var(--text-white);
        background-color: var(--secondary-color);
        border: none;
        border-radius: 10px;
        transition: all 0.3s ease 0s;
        cursor: pointer;
        outline: none;
    }

    .add-btn:hover{
        background-color: var(--tertiairy-color);
    }

    .delete-btn{
        background: var(--danger-color);
        color: var(--text-white);
    }

    .pairs{
        font-size: 17px;
    }

    .requests{
         font-size: 17px;
         font-family: var(--bold);
    }

    .rate{
        font-family: var(--bold);
         font-size: 17px;
    }

 .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  }
</style>