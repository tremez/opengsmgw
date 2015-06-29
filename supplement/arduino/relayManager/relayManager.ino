String inData;
int x;
String str;
String ends;
String OFF="OFF";
String ON="ON";
String STATUS="STATUS";
int pinStatus;


// the setup routine runs once when you press reset:
void setup()  { 
  Serial.begin(9600);    

  
} 

void loop()
{
    if(Serial.available() > 0)
    {
        str = Serial.readStringUntil(' ');
        ends = Serial.readStringUntil('\n');
        x =ends.toInt();


        if(str == ON){
          pinMode(x, OUTPUT);
          Serial.print("Arduino Received: ON ->");
          Serial.print(x);
          digitalWrite(x,HIGH);
        }
        if(str == OFF){
          pinMode(x, OUTPUT);
          Serial.print("Arduino Received: OFF ->");
          Serial.print(x);
          digitalWrite(x,LOW);
          
        }
        if(str == STATUS){
          Serial.print("Arduino Received: STATUS ->");
          Serial.print(x);
          Serial.print(" --> ");
          pinStatus=digitalRead(x);
          if (pinStatus == LOW){
            Serial.print("OFF");
          }
          if (pinStatus == HIGH){
            Serial.print("ON");
          }
          
        }
        Serial.print("\r\nOK\r\n");
       
    }
}
