import { create } from 'zustand';
import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface UserData {
  id: string;
  email: string;
  name?: string;
  preferences?: {
    dailyCalories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserPreferences: (preferences: UserData['preferences']) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await getDoc(doc(db, 'users', userCredential.user.uid));
      set({ 
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          ...userData.data()
        },
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userData = {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        name,
        preferences: {
          dailyCalories: 2000,
          protein: 150,
          carbs: 200,
          fat: 70
        }
      };
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      set({ user: userData, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateUserPreferences: async (preferences: UserData['preferences']) => {
    const { user } = get();
    if (!user) return;

    try {
      await setDoc(doc(db, 'users', user.id), {
        ...user,
        preferences
      }, { merge: true });

      set({ user: { ...user, preferences } });
    } catch (error: any) {
      set({ error: error.message });
    }
  }
}));

// Initialize auth state listener
onAuthStateChanged(auth, async (user: User | null) => {
  if (user) {
    const userData = await getDoc(doc(db, 'users', user.uid));
    useAuthStore.setState({ 
      user: {
        id: user.uid,
        email: user.email!,
        ...userData.data()
      },
      loading: false 
    });
  } else {
    useAuthStore.setState({ user: null, loading: false });
  }
});