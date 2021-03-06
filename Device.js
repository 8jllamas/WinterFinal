

function Device(t,ma,c){

    //Instance Variables
    this.type = t;
    this.state = "off";
    this.milliAmps = ma;
    this.capacity = c;
    this.juice = 1;
    this.rate = [0.0015,0.0235,0.23];

    //Instance Functions
    this.on = function(){
        if(this.state == "off" && this.juice >0){
           this.state = "idle";

        }
    }
    this.off = function(){
        if(this.state == "idle" || this.juice<=0 || this.state == "active"){
        this.state = "off";
    }
}
    this.wake = function(){
        if((this.state == "idle" || this.state == "off") && this.juice>0){
        this.state = "active";
      }
    }
    this.sleep = function(){
        if(this.state == "active" && this.juice>0){
        this.state = "idle";
    }
}

    this.charge = function(min){
        //adds more electricity to the device's juice depending on its state
        let charge = (this.milliAmps/ this.capacity);
          let time = min / 60;
          let output;
        if(this.state == "off"){
            output = 1 - this.rate[0];
        }
        else if(this.state = "idle"){
            output = 1 - this.rate[1];
                }
        else if(this.state = "active"){
            output = 1 - this.rate[2];
                }
          this.juice = this.juice + charge*output*time;
        //resets juice to 1 if it has exceeded 1
        if(this.juice>1){
          this.juice=1;
      }
};

  this.use = function(min){
    let time = min/60

    if(this.state == "off"){
       this.juice = this.juice - this.rate[0];
    }
    else if(this.state == "idle"){
       this.juice = this.juice - this.rate[1]
    }
    else if(this.state == "active"){
       this.juice = this.juice - this.rate[2]
    }
  }
    this.power = function(){
      return this.juice;
    }

}


//end of the device declaration

//defines the testing code.
function main(){
  let flemphone = new Device("phone",3000,10000);
  console.log(flemphone.power());
  flemphone.on();
  flemphone.wake();
  flemphone.use(90);
  console.log(flemphone.power());
  flemphone.sleep();
  flemphone.use(300);
  console.log(flemphone.power());
  flemphone.off();
  flemphone.use(300);
  console.log(flemphone.power());
  flemphone.charge(30);
  console.log(flemphone.power());
  flemphone.charge(1000);
  console.log(flemphone.power());

}
//runs the testing code.
main();
module.exports = Device;
