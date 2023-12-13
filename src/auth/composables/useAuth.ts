
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { Loading, Notify } from "quasar";
import { authFirebase, dbFirebase } from "src/boot/firebase";
import { useRouter } from "vue-router";
import { authStore } from "../store/authStore";
import { storeToRefs } from "pinia";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { Auth } from "../interface/Auth.interface";


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
      setUser(true, userAuth.value);
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
        tokenStore.value = credential!.accessToken!;
        userAuth.value = { email: email!, displayName: displayName!, photoURL: photoURL!, uid };
        setUser(true, userAuth.value);
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

  const setUser = async (estado: boolean, user?: Auth) => {

    setDoc(doc(dbFirebase, 'users', user!.uid),
      {
        displayName: user!.displayName,
        photoURL: user!.photoURL,
        email: user!.email,
        estado: estado
      }
    )


  }


  const logout = async () => {
    Loading.show();

    //Segmentos de ruta adicionales que se aplicarán en relación con el primer argumento.
    // Obtiene una instancia de preferencia de documentos que se refiere al documento en la ruta absoluta especificada.

    // @param Firestore: una referencia a la instancia de Root Firestore.

    // @param ruta: una ruta separada por barras a un documento.

    // @param pathsegments
    // segmentos de ruta adicionales que se aplicarán en relación con el primer argumento.


    try {
      const userFirebase = doc(dbFirebase, "/users", userAuth.value!.uid);



      //Establezca el campo "Capital" de la ciudad 'DC'
      await updateDoc(userFirebase, {
        estado: false
      });


      tokenStore.value = '';
      userAuth.value = { displayName: '', email: '', photoURL: '', uid: '' };
      isLogin.value = false;
      await signOut(authFirebase);
      router.push('/');
      Loading.hide();
      Notify.create({
        type: 'info',
        message: 'SESION CERRADA'
      });
    } catch (error) {
      console.log(error);

    }

    Loading.hide();

  }


  return {
    register,
    login,
    loginPopup,
    logout
  }

}

export default useAuth