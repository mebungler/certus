package database

import (
	"../../logger"
	"../models"
)

func GetAllOperations() ([]models.Operation,error){
	var operations []models.Operation
	DB.Preload("Equipment").Find(&operations)

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
		logger.LogErr(DB.Error)
		return DB.Error
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
