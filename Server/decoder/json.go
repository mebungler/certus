package decoder

import (
	"io"
	"encoding/json"
	"../data/models"
)

func GetUser(closer io.ReadCloser) (models.User,error) {
	var user models.User
	decoder :=json.NewDecoder(closer)
	err:=decoder.Decode(&user)
	if err != nil {
		return user,err
	}
	return user,nil
}

func GetProduct(closer io.ReadCloser) (models.Product,error) {
	var product models.Product
	decoder :=json.NewDecoder(closer)
	err:=decoder.Decode(&product)
	if err != nil {
		return product,err
	}
	return product,nil
}

func GetOperation(closer io.ReadCloser) (models.Operation,error) {
	var operation models.Operation
	decoder :=json.NewDecoder(closer)
	err:=decoder.Decode(&operation)
	if err != nil {
		return operation,err
	}
	return operation,nil
}

func Get(closer io.ReadCloser,item interface{}) error {
	decoder :=json.NewDecoder(closer)
	err:=decoder.Decode(item)
	if err != nil {
		return err
	}
	return nil
}




