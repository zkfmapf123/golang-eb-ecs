package s3

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

func S3Create(m map[string]string) *s3env {

	return &s3env{
		accessKey:  m["accessKey"],
		secretKey:  m["secretKey"],
		region:     m["region"],
		bucketName: m["bucketName"],
		filePath:   m["filePath"],
	}
}

func (s s3env) CreateBucket() error {
	return nil
}

func (s s3env) PushZipFile() error {
	return nil
}
