<template>
    <div class="signin-container">
     
    <div class="signup-card">
        <label for="email">Your Bussiness profile Image</label>
        <input type="text" v-model=" banner_url" placeholder="enter your picture"> 
        <label for="email">Your Bussiness Banner Image</label>
        <input type="text" v-model=" profile_url" placeholder="enter your picture"> 
        <label for="email">Email</label>
        <input  v-model="email" type="text" required placeholder="enter your email">
        <label  for="Business name">Business Name</label>
        <input  v-model="name" type="text" required placeholder="name">
        <label for="address">Address</label>
        <input   v-model="address" type="text" required placeholder="address">
        <label for="phone number">Phone Number</label>
        <input   v-model="phone_number" type="text" required placeholder="phone-number">
        <label for="Bio">Bio</label>
        <input   v-model="bio" type="text" required placeholder="Bio">
        <label for="city">City</label>
        <input   v-model="city" type="text" required placeholder="City">
        <label  for="password">Password</label>
        <input  v-model="password" type="password" required placeholder="Password">
        <button @click="getResponseToken" type="submit">submit</button>
    </div>
    <tost-message  v-if="showToast" :title="toastTitle" :message="toastMessage"></tost-message>

</div>

</template>

<script>
import axios from "axios";
import Cookies from "vue-cookies"
import TostMessage from  '@/components/TostMessage.vue'
export default {
    components: {
        TostMessage

        },
       data() {
            return {
                name: undefined,
                phone_number: undefined,
                address: undefined,
                email: undefined,
                password:undefined,
                bio: undefined,
                city:undefined,
                profile_url: undefined,
                banner_url:undefined,
                restaurant_token: undefined,
                restaurant_id: undefined,
                showToast: false,
                toastTitle: undefined,
                toastMessage:undefined
            }
        },
    methods: {
        getResponseToken(){
            axios.request( {
                url: `${process.env.VUE_APP_BASE_URL}/api/restaurant`,
                method: `POST`,
                data: {
                    name: this.name,
                    address: this.address,
                    phone_number: this.phone_number,
                    bio: this.bio,
                    city: this.city,
                    profile_url: this.profile_url,
                    banner_url: this.banner_url,
                    email: this.email,
                    password: this.password,
                
                }
            } ).then( ( response ) =>{
                console.log(response)
                this.restaurant_token = response[`data`][0][`token`]
                this.restaurant_id = response[`data`][0][`id`]
                Cookies.set( `restaurant_token`, this.restaurant_token )
                Cookies.set( `restaurant_id`, this.restaurant_id )
                this.$router.push(`/partner-home`) 
            } ).catch( ( error ) =>{
                this.toastTitle=`Error`
                this.toastMessage =error[`response`][`data`]
                this.showToast = true
            } )
        }
    }
    }
</script>

<style scoped>
.signin-container{
    display: grid;
  justify-items: center;
  width: 100%;
  
}
.signup-card {
    display: grid;
  justify-items: center;
  width: 70%;
  margin: 32px auto;
  padding: 20px;
  background-color: #fcfcfb;
  border: 1px solid #7ed957;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: .9rem;
  justify-self: start;
  color: #7ed957;
}

input{
width: 90%;
padding: 10px;
margin-bottom: 20px;
border: none;
border-radius: 5px;
background-color: #f5f3f1;
font-size: .8rem;
justify-self: start;
}


button{
display: block;
  width: 40%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color:  #7ed957;;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

@media only screen and (min-width: 600px) {
    .signup-card {
        width: 50%;
    }
}
@media only screen and (min-width: 900px) {
    .signup-card {
        width: 30%;
    }
}
</style>