package database

import (
	"../models"
	"../../logger"
)

func AddModel(model models.Model) error {
	if !DB.HasTable(&model) {
		DB.CreateTable(&model)
	}
	DB.Create(&model)
	if DB.Error!=nil {
		logger.LogErr(DB.Error)
		return DB.Error
	}
	return nil
}

func GetModel(ID string) (models.Model,error)  {
	model := models.Model{}
	DB.Where("ID = ?").First(&model)
	if DB.Error!=nil {
		logger.LogErr(DB.Error)
		return models.Model{},DB.Error
	}
	return model,nil
}

func GetAllModels() ([]models.Model,error)  {
	var models1 []models.Model
	DB.Find(&models1)
	if DB.Error!=nil {
		logger.LogErr(DB.Error)
		return []models.Model{},DB.Error
	}
	return models1,nil
}
