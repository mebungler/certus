package database

import (
	"../models"
	"../../logger"
)

func GetEquipment(ID string) (models.Equipment,error){
	equipment :=models.Equipment{}
	DB.Where("ID = ?", ID).First(&equipment)
	if DB.Error!=nil{
		logger.LogErr(DB.Error)
		return models.Equipment{},DB.Error
	}
	return equipment,nil
}

func GetEquipments() ([]models.Equipment,error){
	var equipments []models.Equipment
	DB.Find(&equipments)
	if DB.Error!=nil{
		logger.LogErr(DB.Error)
		return []models.Equipment{},DB.Error
	}
	return equipments,nil
}

func AddEquipment(equipment models.Equipment) error {
	if !DB.HasTable(&equipment) {
		DB.CreateTable(&equipment)
	}
	DB.Create(&equipment)
	if DB.Error!=nil{
		return DB.Error
		logger.LogErr(DB.Error)
	}
	return nil
}

func RemoveEquipment(id string) error{
	DB.Delete(models.Equipment{ID:id})
	if DB.Error!=nil{
		logger.LogErr(DB.Error)
		return DB.Error
	}
	return nil
}


