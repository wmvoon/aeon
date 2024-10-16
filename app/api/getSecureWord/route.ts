//define secure word data type
type SecureWordResponse = {
    word: string;
  };

  //make sure Promise return a string data
const mockFetchSecureWord = async (): Promise<SecureWordResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ word: 'secure123' });
      }, 500); 
    });
  };

  export default mockFetchSecureWord