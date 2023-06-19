package main

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

func getEnv() *viper.Viper {
	viper.SetConfigName("env")
	viper.SetConfigType("json")
	viper.AddConfigPath("./")

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalln(err)
	}

	return viper.GetViper()
}

func main() {

	env := getEnv()
	fmt.Println(env)
}
