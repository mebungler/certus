package database

import (
	"../models"
	"../../logger"
)

func GetAllOperations() ([]models.Operation,error){
	var operations []models.Operation
	DB.Find(&operations)
	if DB.Error!=nil{
		return nil,DB.Error
		logger.LogErr(DB.Error)
	}
	return operations,nil
}
func AddOperation(operation models.Operation) error {
	if !DB.HasTable(&operation) {
		DB.CreateTable(&operation)
	}
	DB.Create(&operation)
	if DB.Error!=nil{
		return DB.Error
		logger.LogErr(DB.Error)
	}
	return nil
}

func RemoveOperation(id string) error{
	DB.Delete(models.Operation{ID:id})
	if DB.Error!=nil{
		return DB.Error
		logger.LogErr(DB.Error)
	}
	return nil
}
