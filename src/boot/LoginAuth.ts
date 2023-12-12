import { boot } from 'quasar/wrappers'
import { authStore } from 'src/auth/store/authStore';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {


  const store = authStore();
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.isAuthenticats)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (store.isLogin === true) {

        next({
          path: '/admin',
          // query: { redirect: to.fullPath }
        })
      } else {
        next();
      }
    } else {
      next(); // make sure to always call next()!
    }
  });

})
