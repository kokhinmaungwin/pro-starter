const API="/api/auth";

async function register(){
  await fetch(API+"/register",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:email.value,
      password:password.value
    })
  });
  alert("registered");
}

async function login(){
  const res = await fetch(API+"/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:email.value,
      password:password.value
    })
  });
  const data = await res.json();
  localStorage.setItem("token",data.token);
}

async function profile(){
  const res = await fetch(API+"/profile",{
    headers:{
      Authorization: localStorage.getItem("token")
    }
  });
  const data = await res.json();
  result.innerText=data;
}
