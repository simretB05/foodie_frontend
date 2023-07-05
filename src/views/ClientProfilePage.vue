<template>
    <div >
        <page-header></page-header>
            <div class="main-section">
                <get-client-information></get-client-information>
            </div>
       <page-footer></page-footer>
    </div>
</template>
<script>
  import PageHeader from '@/components/Client/PageHeader.vue';
import PageFooter from "@/components/Client/PageFooter.vue";
  import GetClientInformation from '@/components/Client/GetClientInformation.vue'
    export default {
    components: {
        PageHeader,
        PageFooter,
        GetClientInformation
    },
}
    
</script>

<style scoped>
.main-section{
    min-height: 80vh;
}
</style>