<template>
        <div>
          <tost-message  v-if="showToast" :title="toastTitle" :message="toastMessage"></tost-message>
            <div class="remove_user">
                <label for="first name">Enter Your Password</label>
                <input v-model="pass_value" type="password" required placeholder="Enter your User Password" aria-required>
                <button @click="removeUserProfile" type="submit">Remove Profile</button>
            </div>
    </div>
</template>
<script>
import TostMessage from  '@/components/TostMessage.vue'
import Cookies from "vue-cookies"
import axios from "axios";
export default {
         components: {
            TostMessage
        },
        data() {
        return {
                showToast: false,
                toastTitle: undefined,
                toastMessage:undefined,
                pass_value: undefined,
                token: Cookies.get( `token` ),
            }
    },
    mounted() {
    },
    methods: {
        removeUserProfile(){
            this.savedUser = undefined

            axios.request( {
                // Url to send the post Method
                url: `${process.env.VUE_APP_BASE_URL}/api/client`,
                method: `DELETE`,
                data: {
                    password: this.pass_value,
                }
            } ).then( () =>{
                Cookies.remove( `client_id` )
                Cookies.remove( `client_info` )
                Cookies.remove( `token` )
                this.$root.$emit("removed");
                this.$router.push( `/` )

            } ).catch( ( error ) =>{
                error;
                this.toastTitle = `error`
                this.toastMessage = `"Invalid input! Please try again."`
                this.showToast = true
            } )
        },
    },
        }
    
</script>

<style  scoped>
.remove_user {
  display: grid;
  place-items: center;
  margin-top: 20px;
  
}

label {
  font-size: 16px;
  font-weight: bold;
}

input {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

button:active {
  background-color: #3e8e41;
}
</style>