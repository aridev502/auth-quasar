
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { Loading, Notify } from "quasar";
import { authFirebase } from "src/boot/firebase";
import { useRouter } from "vue-router";
import { authStore } from "../store/authStore";
import { storeToRefs } from "pinia";


interface AuthInt {
  email: string;
  password: string;
}

const useAuth = () => {

  const store = authStore();

  const { token: tokenStore, userAuth, isLogin } = storeToRefs(store);


  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const register = async (auth: AuthInt) => {
    try {
      Loading.show()
      const data = await createUserWithEmailAndPassword(authFirebase, auth.email, auth.password);
      Loading.hide();
      Notify.create({
        type: 'positive',
        message: 'Registro Exitoso'
      });

      router.push({ name: 'login' })
    } catch (error) {
      Loading.hide()
      Notify.create({
        type: 'negative',
        message: 'Registro Fallido / Email Ya ocupado'
      });
    }
  }

  const login = async (auth: AuthInt) => {

    try {
      Loading.show()
      const data = await signInWithEmailAndPassword(authFirebase, auth.email, auth.password);
      const { email, photoURL, displayName, uid, refreshToken } = data.user;
      tokenStore.value = refreshToken;
      userAuth.value = { email: email!, displayName: displayName!, photoURL: photoURL!, uid }
      isLogin.value = true;
      router.push('/admin');
      Loading.hide();
      Notify.create({
        type: 'positive',
        message: 'Login Exitoso'
      });


    } catch (error: any) {
      console.log({ code: error.code, msj: error.message, });

      Loading.hide()
      Notify.create({
        type: 'negative',
        message: 'Login Fallido'
      });
    }
  }

  const loginPopup = () => {
    Loading.show();
    signInWithPopup(authFirebase, provider)
      .finally(() => {
        Loading.hide();
      })
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const { email, displayName, photoURL, uid } = result.user;
        photoURL?.slice(1, 1);
        console.log(photoURL);

        tokenStore.value = credential!.accessToken!;
        userAuth.value = { email: email!, displayName: displayName!, photoURL: photoURL!, uid }
        Loading.hide();
        Notify.create({
          type: 'positive',
          message: 'Login Exitoso'
        });
        isLogin.value = true;
        router.push('/admin');
      }).catch((error) => {
        Loading.hide();
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }


  const logout = async () => {
    Loading.show();
    await signOut(authFirebase);
    tokenStore.value = '';
    userAuth.value = { displayName: '', email: '', photoURL: '', uid: '' };
    isLogin.value = false
    router.push('/');
    Loading.hide();
    Notify.create({
      type: 'info',
      message: 'SESION CERRADA'
    });


  }


  return {
    register,
    login,
    loginPopup,
    logout
  }

}

export default useAuth