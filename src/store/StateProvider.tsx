import { createContext, useContext, useReducer } from 'react';
import { IState, IStoreContext } from '../Interface/store';

export const StateContext = createContext<IStoreContext | undefined>(undefined);

interface IStateProviderProps {
  reducer: any;
  initialState: IState;
  children: React.ReactNode;
}

export const StateProvider = ({
  reducer,
  initialState,
  children,
}: IStateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within StateProvider');
  }
  return context;
};
