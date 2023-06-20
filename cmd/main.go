package main

import (
	"log"

	"github.com/spf13/viper"
	"zkfmapf123.github.com/elastic-beanstalk/src/awslib"
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

func makeObject(env *viper.Viper) {
	s3Client := awslib.S3Create(env)
	s3Client.CreateBucket()
}

func main() {

	env := getEnv()
	makeObject(env)

}
