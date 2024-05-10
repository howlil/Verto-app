export default async function loginAdmin({email, password}){

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("email", email);
urlencoded.append("password", password);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow"
};

try {
    const apiURL = `${import.meta.env.VITE_API_BASE_URL}/login`;
   
    const response = await fetch(apiURL, requestOptions)
    if(!response.ok){
        throw new Error('Login failed')
    }

    const data = await response.json();
    console.log("ini data login",data)
    const token = result.token;

    if (token) {
      localStorage.setItem("authToken", token);
    }
    return data;

} catch (error) {
    console.log("Fetch error:", error);
    throw error;   
}
}
