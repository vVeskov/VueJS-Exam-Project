import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/Home';
import SignIn from '@/components/authentication/SignIn';
import SignUp from '@/components/authentication/SignUp';
import DetailsGift from '@/components/gifts/DetailsGift';
import CreateGift from '@/components/gifts/CreateGift';
import EditGift from '@/components/gifts/EditGift';
import OrderGift from '@/components/gifts/OrderGift';
import Cart from '@/components/gifts/Cart';
import PendingGiftOrders from '@/components/gifts/PendingGiftOrders';

Vue.use(Router)
  const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/gift/:id',
      name: 'detailsGift',
      component: DetailsGift
    },
    {
      path: '/create',
      name: 'createGift',
      component: CreateGift
    },
    {
      path: '/edit/:id',
      name: 'editGift',
      component: EditGift
    },
    {
      path: '/order/:id',
      name: 'orderGift',
      component: OrderGift
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/pending-orders',
      name: 'pendingGiftOrders',
      component: PendingGiftOrders
    },
  ],
})

router.beforeEach((to,from,next) => {
  let user = localStorage.getItem("username");
  let isAdmin = false;
  if(user == 'Admin'){
    isAdmin = true;
  }
  let path = to.fullPath;
  if(path.startsWith('/order/') && user == null){
    next('signin')
  }
  if(path.startsWith('/cart') && user == null){
    next('signin')
  }
  if(path.startsWith('/create') && !isAdmin){
    next('signin')
  }
  if(path.startsWith('/edit/') && !isAdmin){
    next('signin')
  }
  if(path.startsWith('/pending-orders') && !isAdmin){
    next('signin')
  }
  
  next();
  // if(path.startsWith(
})
export default router;
