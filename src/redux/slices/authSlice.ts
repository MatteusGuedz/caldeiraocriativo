import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ImgAvatar from '../../Assets/images/avatar.jpg';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('@CaldeiraoCreativo:token'),
  isAuthenticated: !!localStorage.getItem('@CaldeiraoCreativo:token'),
  loading: false,
  error: null
};

// Async thunks
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Simular uma requisição de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Para testes, qualquer e-mail com senha "senha123" vai logar
      if (password === 'senha123') {
        const userData: User = {
          id: '1',
          name: email.split('@')[0], // Nome baseado no e-mail
          email,
          avatar: ImgAvatar,
          role: email.includes('admin') ? 'admin' : 'user'
        };
        
        const token = 'token-fake-para-testes';
        localStorage.setItem('@CaldeiraoCreativo:user', JSON.stringify(userData));
        localStorage.setItem('@CaldeiraoCreativo:token', token);
        
        return { user: userData, token };
      }
      
      return rejectWithValue('Credenciais inválidas');
    } catch (error) {
      return rejectWithValue('Erro ao fazer login');
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => {
    localStorage.removeItem('@CaldeiraoCreativo:user');
    localStorage.removeItem('@CaldeiraoCreativo:token');
    return null;
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = localStorage.getItem('@CaldeiraoCreativo:user');
      const storedToken = localStorage.getItem('@CaldeiraoCreativo:token');

      if (storedUser && storedToken) {
        return { 
          user: JSON.parse(storedUser), 
          token: storedToken 
        };
      }
      
      return rejectWithValue('Usuário não autenticado');
    } catch (error) {
      return rejectWithValue('Erro ao carregar usuário');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      
      // Sign Out
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      
      // Load User
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  }
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;