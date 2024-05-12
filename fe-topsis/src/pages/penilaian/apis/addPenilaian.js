export default async function addPenilaian(id_alternatif, penilaian) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");  
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("authToken"));

    const raw = JSON.stringify({
        "id_alternatif": id_alternatif,
        "penilaian": penilaian
      });
      
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    try {
      const apiURL = `${import.meta.env.VITE_API_BASE_URL}/addPenilaian`;
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
  