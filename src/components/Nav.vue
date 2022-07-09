<template>
    <div id="nav">
      <svg  @click="nav_toggle" id="hamMenu" class="ham hamRotate ham1" viewBox="0 0 100 100" width="80">
        <path class="line top" d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
        <path class="line middle" d="m 30,50 h 40" />
        <path class="line bottom" d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
      </svg>
      <div id="menu" v-show="menuActive">
        <router-link @click="closeNav" to="/">Home</router-link>
      </div>
        
  </div>
</template>
<script>
export default {
    name: 'Nav',
    data(){
      return{
        menuActive:false
      }
    },
    methods:{
      nav_toggle() {
        var icon = document.getElementById("hamMenu");
        icon.classList.toggle("active");
        var menu = document.getElementById("menu")
        if(this.menuActive){
          menu.classList.add("out");
          menu.classList.remove("in");
          console.log("on sort")
          this.menuActive=false; // fix temporaire
          setTimeout(function(){
            console.log("test")
            this.menuActive=false;
            document.body.classList.toggle("noscroll");
            console.log(this.menuActive)
          }, 400);
          console.log(this.menuActive)
        }
        else{
          menu.classList.add("in");
          menu.classList.remove("out");
          console.log("on entre")
          this.menuActive=true;
          setTimeout(function(){
            document.body.classList.toggle("noscroll");
          }, 400);
        }
        
      console.log(this.menuActive)
      },
      closeNav(){
        var icon = document.getElementById("hamMenu");
        var menu = document.getElementById("menu")
        if(this.menuActive){
          menu.classList.add("out");
          menu.classList.remove("in");
          icon.classList.remove("active");
          this.menuActive=false;
        }	
      }
    }
}
</script>
<style lang="scss">

#nav {
  top: 0px;
  right: 0px;
  position: fixed;
  z-index: 1000;
}

#nav svg{
  top: 0px;
  right: 20px;
  position: absolute;
  z-index: 11000;
}

#menu{
  display: flex;
  position: relative;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: $dark-blue;
  z-index: 100;
}

.in{
  animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940);

}
.out{
  animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530);
}

#menu a{
  color: $white;
  text-decoration: none;
  font-family: Epilogue;
  font-style: normal;
  font-weight: bold;
  font-size: 1.3rem;
  margin: 0 1rem;
  background-image: linear-gradient(var(--darkest-blue), var(--darkest-blue)), linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0) );
  &.router-link-exact-active {
      color: #42b983;
    }
}

.animationUnderline{
  background-size: 0 2px, auto;
  background-repeat: no-repeat;
  background-position: center bottom;
  transition: all .2s ease-out;
  
}

.animationUnderline:hover {
  background-size: 100% 2px, auto;
}

.animationUnderline{
  background-size: 100% 2px, auto;
}
.visibilityNone{
  visibility: hidden;
}
.noscroll{
  overflow:hidden;
}


.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.active .line{
  stroke:$red;
}

.line {
  fill:none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke:$dark-blue;
  stroke-width:5.5;
  stroke-linecap:round;
}
.ham1 .top {
  stroke-dasharray: 40 139;
}
.ham1 .bottom {
  stroke-dasharray: 40 180;
}
.ham1.active .top {
  stroke-dashoffset: -98px;
}
.ham1.active .bottom {
  stroke-dashoffset: -138px;
}

@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-out-right {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
    display: none;
  }
}

</style>