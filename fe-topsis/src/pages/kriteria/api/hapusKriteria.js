export default async function hapusKriteria({ id }) {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("authToken")
  );

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const apiURL = `${import.meta.env.VITE_API_BASE_URL}/deleteKriteria/${id}`;
    const response = await fetch(apiURL, requestOptions);



    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
