import React, {useState, useContext, createContext} from 'react';

export const CoordsContext = createContext();
export const PresentPositionContext = createContext();

const PositionContext = ({children}) => {
  const [coords, setCoords] = useState(undefined);
  const [presentPosition, setPresentPosition] = useState('現在地を取得中です');

  return (
    <CoordsContext.Provider
      value={[coords, setCoords]}>
      <PresentPositionContext.Provider
        value={[presentPosition, setPresentPosition]}>
        {children}
      </PresentPositionContext.Provider>
    </CoordsContext.Provider>

  );
};

export const useCoordsContext = () => useContext(CoordsContext);
export const usePositionContext = () => useContext(PresentPositionContext);

export default PositionContext;
