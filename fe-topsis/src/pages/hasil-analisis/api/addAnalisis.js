export default async function addAnalisis({ nama}) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");  
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("authToken"));

  const raw = JSON.stringify({
  "nama": nama,
});

  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    try {
      const apiURL = `${import.meta.env.VITE_API_BASE_URL}/addAnalisis`;
      const response = await fetch(apiURL, requestOptions);
      
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || 'Add Kriteria failed');
      }
  
      const data = await response.json();
  
      return data;
  
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  