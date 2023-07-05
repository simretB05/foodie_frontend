import Vue from 'vue';
import Vuex from 'vuex';


Vue.use( Vuex )
export const store = new Vuex.Store( {

    state: {
        restaurantId: undefined,
        clientInfo: undefined,
        restInfo: undefined,
        menuData: undefined

    },
    mutations: {
        setRestaurantId( state, newRestaurantId )
        {
            state.restaurantId = newRestaurantId;
        },
        setClientInfo( state, newClientInfo )
        {
            state.clientInfo = newClientInfo
        },
        setRestInfo( state, newRestInfo )
        {
            state.restInfo = newRestInfo
        },
        setMenuData( state, newMenuData )
        {
            state.menuData = newMenuData
        }
    },

} );
export default store;

