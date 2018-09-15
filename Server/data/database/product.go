package database

import (
	"../models"
	"../../logger"
)

func GetProduct(ID string) (models.Product,error){
	product:=models.Product{}
	DB.Where("ID = ?", ID).First(&product)
	if DB.Error!=nil{
		return models.Product{},DB.Error
		logger.LogErr(DB.Error)
	}
	return product,nil
}

func AddProduct(product models.Product) error {
	if !DB.HasTable(&product) {
		DB.CreateTable(&product)
	}
	DB.Create(&product)
	if DB.Error!=nil{
		return DB.Error
		logger.LogErr(DB.Error)
	}
	return nil
}

func RemoveProduct(id string) error{
	DB.Delete(models.Product{ID:id})
	if DB.Error!=nil{
		return DB.Error
		logger.LogErr(DB.Error)
	}
	return nil
}

