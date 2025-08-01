<template>
    <div class="login">
        <form action="">
            <img src="" alt="">
            <h1 class="text-center header">Login</h1>
            <p>Username</p>
            <input type="text" placeholder="Username" class="formControl">
            <p>Password</p>
            <input type="text" placeholder="Password" class="formControl">  
            <br></br>
            <button @click="submit" class="btnSubmit">Login</button>  
        </form>
    </div>
</template>
<script setup>
function submit(){
    alert("Hello")
}
//script
</script>

<style scoped>
.header{
    font-size: 25px;
}
.login{
   padding: 10px 10px 10px 10px;
   background-color: aliceblue;
   border: 1px solid black;
   border-radius: 10px;
   display: inline-block;
   justify-content: center; 
}
.formControl{
    border: 1px solid black;
    padding: 5px;
}
.btnSubmit{
    margin-top: 20px;
    background-color: aqua;
    border: 1px solid black;
    padding: 5px;
    border-radius: 5px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.btnSubmit:hover{
    background-color: aquamarine;   
}
</style>