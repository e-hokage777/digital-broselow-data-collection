import { createContext, useState } from "react";

type DataCaptureData = {
  frontImage: File | null;
  rightImage: File | null;
  leftImage: File | null;
  backImage: File | null;
  age: number | null;
};

interface DataCaptureContextProps {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  data: DataCaptureData;
}

const DataCaptureContext = createContext<DataCaptureContextProps>({
  currentPage: 0,
  nextPage: () => {},
  prevPage: () => {},
  data: {
    frontImage: null,
    rightImage: null,
    leftImage: null,
    backImage: null,
    age: null,
  },
});

// const DataCaptureProvider = DataCaptureContext.Provider;
function DataCaptureProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState(0);

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
        data: {
          frontImage: null,
          rightImage: null,
          leftImage: null,
          backImage: null,
          age: null,
        },
      }}
    >
      {children}
    </DataCaptureContext.Provider>
  );
}

export { DataCaptureContext, DataCaptureProvider };
