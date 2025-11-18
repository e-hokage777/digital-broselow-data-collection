import { createContext, useState } from "react";

export type DataCaptureData = {
  forward: string | null;
  backward: string | null;
  right: string | null;
  left: string | null;
  age: number | null;
};

interface DataCaptureContextProps {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  data: DataCaptureData;
  setData: (data: DataCaptureData) => void;
}

const DataCaptureContext = createContext<DataCaptureContextProps>({
  currentPage: 0,
  nextPage: () => {},
  prevPage: () => {},
  data: {
    forward: null,
    backward: null,
    right: null,
    left: null,
    age: null,
  },
  setData: () => {},
});

// const DataCaptureProvider = DataCaptureContext.Provider;
function DataCaptureProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<DataCaptureData>({
    forward: null,
    backward: null,
    right: null,
    left: null,
    age: null,
  });

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(Math.max(0, currentPage - 1));
  };
  return (
    <DataCaptureContext.Provider
      value={{
        currentPage,
        nextPage,
        prevPage,
        setData,
        data,
      }}
    >
      {children}
    </DataCaptureContext.Provider>
  );
}

export { DataCaptureContext, DataCaptureProvider };
