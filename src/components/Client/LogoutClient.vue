<template>
    <div>
        <tost-message v-if="showToast" :title="toastTitle" :message="toastMessage"></tost-message>
        <button  class="desktoplogout_btn" @click="logoutHandler">Logout</button>

    </div>
</template>

<script>
import TostMessage from "@/components/TostMessage.vue"
 import axios from "axios";
 import Cookies from "vue-cookies"
export default {
    components: {
      TostMessage    
    },
        data() {
        return {
            token: Cookies.get("token" ),
            showToast: false,
            toastTitle: undefined,
            toastMessage:undefined
            }
        },

    methods: {
        logoutHandler() {
      
            axios.request( {
                url: `${ process.env.VUE_APP_BASE_URL }/api/client-logout`,
                method: `DELETE`,
                data: {
                    token: this.token,
                }
            } ).then( () =>{
                Cookies.remove( `client_id` )
                Cookies.remove( `client_info` )
                Cookies.remove( `token` )
                this.$root.$emit( "logout" );
                this.$router.push( `/` )

            } ).catch( ( error ) => {
                error;
                this.toastTitle = `error`
                this.toastMessage = `"Invalid input! Please try again."`
                this.showToast = true
            } )

        }
    }
}
</script>

<style scoped>

.logout_btn,.desktoplogout_btn{
    justify-self: start;
    background-color:#7ed957 ;
    width: 100px;
    padding: 8px;
    border:none;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);	
    color:white;
}
</style>