<template>
    <div class="login">
        <form action="">
            <div style="display: flex; gap: 30px; ">
            <div style="width: auto;">
            <img src="https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg" alt="">
            </div>
            <div style="width: 70%;  margin-right: 18px; display: flex; flex-direction: column; justify-content: center;">
            <h1 class="text-center header">Login</h1>
            <p>Username</p>
            <input type="text" placeholder="Username" class="formControl">
            <p>Password</p>
            <input type="text" placeholder="Password" class="formControl">  
            <br></br>
            <button @click="submit" class="btnSubmit">Login</button> 
            </div> 
            </div>
        </form>
    </div>
</template>
<script setup>
function submit(){
    alert("ចុចចោរអត់មាន password និង username ផងចង់ login ចូលបស់គេ!!!!!!");
}
//script
</script>

<style scoped>
.header{
    font-size: 25px;
    font-weight: bold;
}
.login{
    width: 40%;
  
    padding: 10px 10px 10px 10px;
    background-color: aliceblue;
    border-radius: 10px;
    justify-content: center; 
    box-shadow: 5px 5px 9px 0px rgb(0, 0, 0);
}
.formControl{
    margin-top: 8px;
    border-radius: 3px;
    border: 1px solid black;
    padding: 5px;
}
.btnSubmit{
    font-weight: 500;
    margin-top: 20px;
    background-color: aqua;
    border: 1px solid black;
    padding: 5px;
    border-radius: 50px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90px;
}
.btnSubmit:hover{
    background-color: aquamarine;   
}
</style>