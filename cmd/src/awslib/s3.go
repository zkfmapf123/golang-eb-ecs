package awslib

import (
	"github.com/spf13/viper"
)

type S3 interface {
	CreateBucket() error
	PushZipFile() error
}

type s3env struct {
	accessKey  string
	secretKey  string
	region     string
	bucketName string
	filePath   string
}

func S3Create(v *viper.Viper) *s3env {

	return &s3env{
		accessKey:  v.GetString("accessKey"),
		secretKey:  v.GetString("secretKey"),
		region:     v.GetString("region"),
		bucketName: v.GetString("bucketName"),
		filePath:   v.GetString("filePath"),
	}
}

func (s s3env) CreateBucket() error {
	return nil
}

func (s s3env) PushZipFile() error {
	return nil
}
