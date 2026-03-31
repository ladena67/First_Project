#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"

// WIFI SETTINGS
const char* ssid = "lolomo";
const char* password = "iloveumama";

// SERVER ADDRESS
const char* serverName = "http://10.243.225.18:5000/data";

// DHT SENSOR
#define DHTPIN 5
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// SENSOR PINS
#define LDR_PIN 34
#define SOIL_PIN 35
#define SOIL_POWER 26

float temperature;
float humidity;
int lightValue;
int soilMoisture;

void setup() {
  pinMode(SOIL_POWER, OUTPUT);
  digitalWrite(SOIL_POWER, LOW);
  pinMode(LDR_PIN, INPUT);
  Serial.begin(115200);
  delay(1000);

  // ADC CONFIG (IMPORTANT FOR ESP32)
  analogReadResolution(12);        // 0–4095
  analogSetAttenuation(ADC_11db);  // better voltage range

  dht.begin();
  digitalWrite(SOIL_POWER, LOW);

  // CONNECT TO WIFI
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("\nConnected to WiFi!");
  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {

  // READ DHT22
  humidity = dht.readHumidity();
  temperature = dht.readTemperature();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor");
    delay(5000);
    return;
  }

  // READ LDR
  lightValue = analogRead(LDR_PIN);

  // READ SOIL MOISTURE (AB054 STABLE READ)
  digitalWrite(SOIL_POWER, HIGH);
  delay(200);  // allow sensor to stabilize

  int sum = 0;
  for (int i = 0; i < 10; i++) {
    sum += analogRead(SOIL_PIN);
    delay(10);
  }

  soilMoisture = sum / 10;

  digitalWrite(SOIL_POWER, LOW);

  // SERIAL OUTPUT
  Serial.println("----- Sensor Data -----");

  Serial.print("Temp: ");
  Serial.println(temperature);

  Serial.print("Humidity: ");
  Serial.println(humidity);

  Serial.print("Light: ");
  Serial.println(lightValue);

  Serial.print("Soil: ");
  Serial.println(soilMoisture);

  // SEND DATA TO SERVER
  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;
    http.setTimeout(5000);
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    String jsonData = "{";
    jsonData += "\"temperature\":" + String(temperature) + ",";
    jsonData += "\"humidity\":" + String(humidity) + ",";
    jsonData += "\"light\":" + String(lightValue) + ",";
    jsonData += "\"soil\":" + String(soilMoisture);
    jsonData += "}";

    Serial.println("Sending JSON:");
    Serial.println(jsonData);

    int httpResponseCode = http.POST(jsonData);

    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }

  delay(5000);
}