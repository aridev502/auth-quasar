import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Loading, Notify } from "quasar";
import { authFirebase } from "src/boot/firebase";
import { useRouter } from "vue-router";

interface Auth {
  email: string;
  password: string;
}

const useAuth = () => {

  const router = useRouter();

  const register = async (auth: Auth) => {
    try {
      Loading.show()
      const data = await createUserWithEmailAndPassword(authFirebase, auth.email, auth.password)
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


  const login = async (auth: Auth) => {

    try {
      Loading.show()
      const data = await signInWithEmailAndPassword(authFirebase, auth.email, auth.password);
      console.log(data);

      Loading.hide();
      Notify.create({
        type: 'positive',
        message: 'Registro Exitoso'
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



  return {
    register,
    login
  }

}

export default useAuth