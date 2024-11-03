import { create } from 'zustand';
import { db } from '../firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  Timestamp 
} from 'firebase/firestore';
import { useAuthStore } from './auth-store';

interface NutritionEntry {
  id?: string;
  userId: string;
  date: Date;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: string;
}

interface NutritionState {
  entries: NutritionEntry[];
  loading: boolean;
  error: string | null;
  timeframe: 'daily' | 'weekly' | 'monthly';
  selectedDate: Date;
  fetchEntries: () => Promise<void>;
  addEntry: (entry: Omit<NutritionEntry, 'id' | 'userId' | 'date'>) => Promise<void>;
  setTimeframe: (timeframe: 'daily' | 'weekly' | 'monthly') => void;
  setSelectedDate: (date: Date) => void;
}

export const useNutritionStore = create<NutritionState>((set, get) => ({
  entries: [],
  loading: false,
  error: null,
  timeframe: 'daily',
  selectedDate: new Date(),

  fetchEntries: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      set({ loading: true, error: null });
      const { timeframe, selectedDate } = get();

      let startDate = new Date(selectedDate);
      let endDate = new Date(selectedDate);

      switch (timeframe) {
        case 'daily':
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(23, 59, 59, 999);
          break;
        case 'weekly':
          startDate.setDate(selectedDate.getDate() - selectedDate.getDay());
          endDate.setDate(startDate.getDate() + 6);
          break;
        case 'monthly':
          startDate.setDate(1);
          endDate.setMonth(selectedDate.getMonth() + 1, 0);
          break;
      }

      const q = query(
        collection(db, 'nutrition'),
        where('userId', '==', user.id),
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate))
      );

      const querySnapshot = await getDocs(q);
      const entries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate()
      })) as NutritionEntry[];

      set({ entries, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addEntry: async (entry) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      set({ loading: true, error: null });
      await addDoc(collection(db, 'nutrition'), {
        ...entry,
        userId: user.id,
        date: Timestamp.fromDate(new Date())
      });
      await get().fetchEntries();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setTimeframe: (timeframe) => {
    set({ timeframe });
    get().fetchEntries();
  },

  setSelectedDate: (date) => {
    set({ selectedDate: date });
    get().fetchEntries();
  }
}));