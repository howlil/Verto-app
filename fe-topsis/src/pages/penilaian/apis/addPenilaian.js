export default async function addPenilaian(data) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("authToken"));

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow"
  };

  try {
    const apiURL = `${import.meta.env.VITE_API_BASE_URL}/addPenilaian`;
    const response = await fetch(apiURL, requestOptions);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to add evaluation');
    }

    return result;

  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}