export default async function deleteAlternatif({id}) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("authToken"));


  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
  
    try {
      const apiURL = `${import.meta.env.VITE_API_BASE_URL}/deleteAlternatif/${id}`;
      const response = await fetch(apiURL, requestOptions);

  
      const data = await response.json();
  
      return data;
  
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  