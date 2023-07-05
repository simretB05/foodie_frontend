<template>
    <div v-if="show" class="tost-container">
        <div class="tost_message">
            <p class="message_title">{{ title }}</p>
            <p class="message_body">{{ message }}</p>
        </div>
        <div class="tost_card">
        <button class="clear_btn" @click="hideTost">clear</button>
        </div>
    </div>
</template>
<script>
    export default {
    props: {
            title:String,
            message:String
         },
        data() {
            return {
              show:true
            }
    },
    methods: {
        showTost(){
            this.show=true           
        },
        hideTost(){
            this.show = false    
            
        }
        }
    }
</script>

<style scoped>
.tost-container{
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
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
p{
    margin: 16px;
    color: red;
}
.clear_btn{
  display: block;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: rgb(242, 129, 129);
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
</style>