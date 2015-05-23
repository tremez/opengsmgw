#How to send “Flash SMS”

Flash SMS is a type of SMS which will be displayed directly on screen once received. This one is known working on Nokia mobile phone, I don’t know with others. As we know, normal SMS once received is saved either on SIM card or mobile phone memory and then user is noticed by a beep or similar SMS alarm. Flash SMS is different.

Flash SMS is done by define message class part of TP-DCS of SMS PDU to zero (0x00), what TP-DCS is? Please read GSM 03.40 :). Here’s an example of SMS PDU (in hexadecimal):

15010A91561904472800F4A718496E6920636F6E746F6820666C61736820534D53206C686F

Let us breakdown:

## 1st byte:
0x15 or in binary 00010101

* TP-MTI (bit 0&1) = 01 means this PDU SMS type is SMS-SUBMIT
* TP-RD (bit 2) = 1 means reject duplicate if there’s a same SMS with same TP-MR
* TP-VPF (bit 4&3) = 10 means this SMS contain validity period info with relative format
* TP-SRR (bit 5) = 0 means we don’t ask for delivery report
* TP-UDHI (bit 6) = 0 means no user data header information (UDHI)
* TP-RP (bit 7) = 0 means reply path unused

## 2nd byte:
TP-MR = 0x01, means message reference number is 0x01

## 3rd byte:
TP-DA length = 0x0A, this is length of destination address.I want to send to my own number which is 6591407482 -> see there’re 10 digits, to TP-DA should be 0x0A or 10 in decimal
## 4th byte:
TON/NPI info = 0x91 or in binary format 10010001
* TON (bit 6,5,4) = 001 -> means International Number
* NPI (bit 3,2,1,0) = 0001 -> means ISDN telephone number
## 5th byte .. 9th byte:
5619044728 -> this is the destination number 6591407482 but written in BCD semioctet format
## 10th byte:
TP-PID = 0x00 -> means use default protocol identifier
## 11th byte:
TP-DCS = 0xF4 or in binary format 11110100
* Bit 3,2 = 01, means TP-UD (user data) is encoded using 8 bit format
* Bit 0,1 = 00, means class 0 {this will make this sms become flash sms}
## 12th byte:
TP-VP = 0xA7 means this SMS is valid only for 24 hours
## 13th byte:
TP-UDL = 0x18 means the user data/message part length is 24 character
## the rest byte:

496E6920636F6E746F6820666C61736820534D53206C686F

Thi is hex representation of string “Ini contoh flash SMS lho”, you may use http://www.ttdpatch.net/cgi-bin/str2hex.pl to convert from hex to string and vice versa
