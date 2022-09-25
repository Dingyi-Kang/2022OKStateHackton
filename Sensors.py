import pdb
import RPi.GPIO as GPIO
import time
from mfrc522 import SimpleMFRC522
TRIG=21
ECHO=20
GPIO.setmode(GPIO.BCM)
GPIO.setup(TRIG,GPIO.OUT)
GPIO.setup(ECHO,GPIO.IN)
reader=SimpleMFRC522()
import requests
 
def distance():
    #print("in progress..") 
    GPIO.output(TRIG,False)
    #print("Not ready")
    time.sleep(0.2)
    GPIO.output(TRIG,True)
    time.sleep(0.0001)
    GPIO.output(TRIG,False)
    while GPIO.input(ECHO)==0:
        #print("echo off test")
        #pdb.set_trace()
        pulse_start = time.time()
    while GPIO.input(ECHO)==1:
        #pdb.set_trace()
        # print("echo on test")
        pulse_end = time.time()
    pulse_duration = pulse_end - pulse_start
    distance = pulse_duration*17150
    distance = round(distance,2)
    return distance
    #print("distance :", distance, "cm")
    #time.sleep(2)
 
def rfid():
    id = -1
    try:
        id, text = reader.read()
        return id
    finally:
        print("Scanned Vehicle")
        return id
 
 
if __name__ == '__main__':
    try:
        while True:
            tag = rfid()
            print(tag)
            dist = distance()
            print ("Measured Distance = %.1f cm" % dist)
            r = requests.post('http://10.228.11.187:8081/create',headers = {'userId': tag ,'distance':'20','location': random() })
            print("Data Uploaded to database successfully")
            time.sleep(1)
 
        # Reset by pressing CTRL + C
    except KeyboardInterrupt:
        print("Measurement stopped by User")
        GPIO.cleanup()
 
