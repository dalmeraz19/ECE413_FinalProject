/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#include "Particle.h"
#line 1 "c:/Users/ual-laptop/Documents/ECE413/ECE413/src/ECE413.ino"
/*
  Uses code from ParticleIO examples as well as Sparkfun Libraries
*/

#include <Wire.h>
#include <cmath>
#include "MAX30105.h"
#include "heartRate.h"
#include "spo2_algorithm.h"

//Define System Mode to Allow non Wifi running
void setup();
void loop();
bool takeMeas(int *reddy, int *oxxy);
bool rightTime();
void lFlash(int red, int green, int blue, int loops);
bool sendData(int r, int o);
bool sendData(int r, int o, int h, int m);
int settyDelay(String lesgovalues);
int settyEnd(String lesgovalues);
int settyStart(String lesgovalues);
#line 12 "c:/Users/ual-laptop/Documents/ECE413/ECE413/src/ECE413.ino"
SYSTEM_MODE(SEMI_AUTOMATIC);
SYSTEM_THREAD(ENABLED);

//Define Sensor for project
MAX30105 particleSensor;

#define debug Serial

enum Stateys{standby, waitMeas, yesMeas};
//Data Collection Variables
int cReddy = 0, oxy = 0, olDatar[1000], olDatao[1000],olTimeh[1000], olMinuteh[1000],cNum = 0, lBeat = 0, cBeat;
//uploading bools
bool jConnect = 1, isConnect = 0;
//Timing Variables
int stTimeh = 6,enTimeh =22,stTimem = 0,enTimem = 0;
int cTime = 0;
//Variables you might want to change
int betweenMeas = 30*60;//Set betweenMeas to the time you would like between Measurements(in seconds) 
int lTime = betweenMeas * -1;//Set


int Rate3, oxxxy;

String fullJson;
String heartRateJson;

Stateys cState = standby;

void setup()
{
    debug.begin(9600);
    debug.println("MAX30105 Basic Readings Example");
    //Take control of LED
    RGB.control(true);
    //Establish Online set Variables
    Particle.variable("Rate",Rate3);
    Particle.variable("Oxxxy", oxxxy);
    Particle.variable("HeartRateJson", heartRateJson );
    Particle.variable("FullJson", fullJson );
    Particle.variable("stTimeh", stTimeh);
    Particle.variable("enTimeh", enTimeh);
    Particle.variable("stTimem",stTimem);
    Particle.variable("enTimem",enTimem);
    Particle.variable("betweenMeas",betweenMeas);
    Particle.function("setEndUpdate", settyEnd);
    Particle.function("setStartUpdate", settyStart);
    Particle.function("setBetweenUpdate", settyDelay);


    //Connect to Wifi
    if (!Particle.connected()) {
      debug.print("Attempting to Connect");
      for(int i = 0; i<10;i++){
        if (!Particle.connected()) {
          lFlash(120,0,0,2); //Flashes red if the wifi is not connected to the Particle Argon
          delay(1000);
          Particle.connect();
      }}}


    // Initialize sensor
    if (particleSensor.begin() == false)
    {
        while (1){
        debug.println("MAX30105 was not found. Please check wiring/power. ");}
        
    }

  
    

    //start sensor
    byte ledBrightness = 0xFF; //Options: 0=Off to 255=50mA
    byte sampleAverage = 4; //Options: 1, 2, 4, 8, 16, 32
    byte ledMode = 3; //Options: 1 = Red only, 2 = Red + IR, 3 = Red + IR + Green
    int sampleRate = 50; //Options: 50, 100, 200, 400, 800, 1000, 1600, 3200
    int pulseWidth = 411; //Options: 69, 118, 215, 411
    int adcRange = 16384; //Options: 2048, 4096, 8192, 16384
    particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange); //Configure sensor with these settings




}


void loop(){
   switch(cState){
      //General waiting case while checking conditions for use
      case standby: 
        if(rightTime()){
          if(Time.now() > lTime+betweenMeas){
            cState = waitMeas;
            debug.print("\ntrans to waitMeas");
          }
        }
        break;
      //Case for requesting measurement from user
      case waitMeas:
        cTime = millis() + 1000*60*5;//set for the amount of time you want to wait until Timeout
        while((!takeMeas(&cReddy, &oxy)) && (cTime > millis())){
          lFlash(0,0,255,10);
          RGB.color(0,0,255);}//holds until we have a sample or alloted time has passed
        cState = yesMeas;
        debug.print("\ntrans to yesMeas");
        if(cTime<millis()){//if we actually ran out of time:(
          cState = standby;
          lTime = Time.now();
          debug.print("\ntrans to standby");
        }
        break;
        //Case for measurement found->sending to server
      case yesMeas:
          debug.print("hr found! heartRate = ");
          debug.print(cReddy);
          debug.print("  spo2 = ");
          debug.print(oxy);

          lTime = Time.now();//record data being sent

          if(sendData(cReddy, oxy)){//if our data posts!

            lFlash(0,255,0,3);
            for(int i = 0; i <cNum; i++){//loop for sending any old data
              sendData(olDatar[i],olDatao[i], olTimeh[i], olMinuteh[i]);
              delay(1000);
              lFlash(0,255,0,3);
            }
            cNum = 0;
          }else{
            lFlash(237, 234, 31,3);
            delay(10);
          }
      cState = standby;
      debug.print("\ntrans to standby");

   }
}


bool takeMeas(int *reddy, int *oxxy){
  long int bufferLength = 100; //buffer length of 100 stores 4 seconds of samples running at 25sps
  long int spo2, heartRate;
  uint32_t irBuffer[bufferLength], redBuffer[bufferLength];
  int8_t validSPO2, validHeartRate;
  //read the first 100 samples, and determine the signal range
  for (byte i = 0 ; i < bufferLength ; i++)
  {
    while (particleSensor.available() == false) //do we have new data?
      particleSensor.check(); //Check the sensor for new data

    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample(); //We're finished with this sample so move to next sample


  }

  //calculate heart rate and SpO2 after first 100 samples (first 4 seconds of samples)
  maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);
    *reddy = heartRate;
    *oxxy = spo2;


    if(validSPO2 && validHeartRate)
      return 1;
    return 0;  
}


//Checks to make sure our device is active at the right Time
bool rightTime(){
  //Convert from UTC to local time
  int cHour = ((Time.hour()-7));
  if(cHour<0)
    cHour = cHour+24;
  //cHour = cHour%24;
    if((cHour>=stTimeh)&&(cHour<=enTimeh)){
        if(cHour == stTimeh && Time.minute()<stTimem)
          return 0;
        if(cHour == enTimeh && Time.minute()>enTimem)
          return 0;
        return 1;}
    return 0;
}





//Flash the chosen color
void lFlash(int red, int green, int blue, int loops){
    for(int i =0; i < loops; i++){
    RGB.color(red, green, blue);
    delay(100);
    RGB.color(0,0,0);
    delay(100);}

}


//Sending Function
bool sendData(int r, int o){
    //Attempt to Reconnect to Wifi
    if (!Particle.connected()) {
      debug.print("Attempting to Connect");
      for(int i = 0; i<10;i++){
        if (!Particle.connected()) {
          lFlash(120,0,0,2);
          delay(1000);
          Particle.connect();
      }}}
    //Create JSON to send through webhook
    Rate3 = r;
    oxxxy = o;
    //fullJson = String::format("{\"rate\":\"%d\",\"oxy\":\"%d\",\"hour\":\"%d%\",\"minute\":\"%d\",\"month\":\"%d\",\"day\":\"%d\",\"year\":\"%d\"}", r, o, Time.hour(),Time.minute(),Time.month(), Time.day(),Time.year());
    heartRateJson = String::format("{\"rate\":%d}", r);
    //publish wil return 0 if send is not successful, which we can use to tell if we need to store in our array to send l8r
    if(!Particle.publish("toDalian", heartRateJson)){
      olDatar[cNum] = r;
      olDatao[cNum] = o;
      olTimeh[cNum] = Time.hour();
      olMinuteh[cNum] = Time.minute();
      cNum++;
      return 0;}
    delay(1000);
    Serial.print("\njust sent");
    return 1;




}
//Sending Function when Time is also provided
bool sendData(int r, int o, int h, int m){
    //Attempt to Reconnect to Wifi
    if (!Particle.connected()) {
      debug.print("Attempting to Connect");
      for(int i = 0; i<10;i++){
        if (!Particle.connected()) {
          lFlash(120,0,0,2);
          delay(1000);
          Particle.connect();
      }}}
    //Create JSON to send through webhook
    Rate3 = r;
    oxxxy = o;
    //fullJson = String::format("{\"rate\":\"%d\",\"oxy\":\"%d\",\"hour\":\"%d%\",\"minute\":\"%d\",\"month\":\"%d\",\"day\":\"%d\",\"year\":\"%d\"}", r, o, h,m,Time.month(), Time.day(),Time.year());
    heartRateJson = String::format("{\"rate\":%d}", r);
    //publish wil return 0 if send is not successful, which we can use to tell if we need to store in our array to send l8r
    if(!Particle.publish("toDalian", heartRateJson)){
      olDatar[cNum] = r;
      olDatao[cNum] = o;
      olTimeh[cNum] = Time.hour();
      olMinuteh[cNum] = Time.minute();
      cNum++;
      return 0;}
    delay(1000);
    Serial.print("\njust sent");
    return 1;




}

//sets the delay from post request
int settyDelay(String lesgovalues){
  JSONValue lesgovaluesp = JSONValue::parseCopy(lesgovalues);
  JSONObjectIterator iter(lesgovaluesp);
    debug.print(lesgovalues);

  //iterates through our(one line) JSON file and sets the between measurements variable
  while (iter.next())
    {
        if (iter.name() == "delayokay"){
          betweenMeas = iter.value().toInt()*60;}
    }
    lFlash(135, 26, 132,3);
  return 1;

}

int settyEnd(String lesgovalues){
  JSONValue lesgovaluesp = JSONValue::parseCopy(lesgovalues);
  JSONObjectIterator iter(lesgovaluesp);
    debug.print(lesgovalues);
  //iterates through and sets hour and minute for starting
  while (iter.next())
    {
        if (iter.name() == "hour"){
          enTimeh = iter.value().toInt();}
        if (iter.name() == "minute")
          enTimem = iter.value().toInt();
    }
    lFlash(135, 26, 132, 3);
  return 1;
}

int settyStart(String lesgovalues){
  JSONValue lesgovaluesp = JSONValue::parseCopy(lesgovalues);
  JSONObjectIterator iter(lesgovaluesp);
  debug.print(lesgovalues);
  //iterates through and sets hour and minute for ending
  while (iter.next())
    {
        if (iter.name() == "hour"){
          stTimeh = iter.value().toInt();}
        if (iter.name() == "minute")
          stTimem = iter.value().toInt();
    }
    lFlash(135, 26, 132,3);
  return 1;
}