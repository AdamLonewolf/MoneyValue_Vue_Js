<script>
export default {
    data() {
        return{
            //Ce objet est un tableau qui va stocker les infos envoyés par l'api
            pairs:[]
        }
    },

    methods:{
        async getData(){
            var link = `${this.url}pairs/list`;
            this.pairs = await(await(fetch(link, {
                method:"get"
            }))).json(); //on envoie directement les informations dans l'objet pairs
            console.log(this.pairs);
        },

        //Fonction pour supprimer une paire 

        async deletePair(id){
            var deletelink = `${this.url}pairs/delete/${id}`
            var res = await(await(fetch(deletelink,{
                method: "delete"
            }))).json();
            if(res.status == "OK"){
                this.pairs.data = this.pairs.data.filter((pair)=>pair.id != id) //Si tout se passe bien, on filtre la liste des paire et on met de côté tous ceux qui n'ont pas l'id selectionné.
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
        <router-link :to="`/form`" class="custom-link">
            <button class="add-btn">
                <i class="fa-solid fa-plus mx-2"></i>
                Ajouter une nouvelle paire
            </button>
        </router-link>
    </div>
    <table id="table" class="table table-striped table-responsive">
    <thead class="table-dark">
        <tr>
            <th scope="col">id</th>
            <th scope="col">Monnaie Source</th>
            <th scope="col">Monnaie Cible</th>
            <th scope="col">Taux de conversion</th>
            <th scope="col">Nombre de requêtes</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="pair in pairs.data" :key="pair.id">
            <th scope="row">{{pair.id}}</th>
            <td :id="pair.from_currency_id" class="pairs">{{pair.from_currency_code}}</td>
            <td :id="pair.to_currency_id" class="pairs">{{pair.to_currency_code}}</td>
            <td class="rate">{{pair.convert_rate}}</td>
            <td class="requests">{{pair.requests}}</td>
            <td>
              <div class="action-btn d-flex align-items-center">
                 <router-link :to="`/form/${pair.id}`">
                    <button class="action edit-btn">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </router-link>
                 <button class="action delete-btn" @click="deletePair(pair.id)">
                    <i class="fa-solid fa-trash-can"></i>
                 </button>
              </div>
            </td>
        </tr>
    </tbody>
    </table>
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
</style>