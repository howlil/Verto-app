export default async function getAnalisis() {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("authToken")
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const apiURL = `${import.meta.env.VITE_API_BASE_URL}/getAnalisis`;
    const response = await fetch(apiURL, requestOptions);

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || "Get Kriteria failed");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
