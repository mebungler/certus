package database

import (
	"../models"
	"../../logger"
)

func AddType(clotheType models.TypeOfCloth) error  {
	if !DB.HasTable(&clotheType){
		DB.CreateTable(&clotheType)
	}
	DB.Create(&clotheType)
	if DB.Error !=nil {
		logger.LogErr(DB.Error)
		return DB.Error
	}
	return nil
}

func GetType(ID string)	(models.TypeOfCloth,error)  {
	clothetype :=models.TypeOfCloth{}
	DB.Where("ID = ?").First(&clothetype)
	if DB.Error!=nil {
		logger.LogErr(DB.Error)
		return models.TypeOfCloth{},DB.Error
	}
	return clothetype,nil
}
func GetAllTypes() ([]models.TypeOfCloth,error)  {
	var clothetypes []models.TypeOfCloth
	DB.Find(&clothetypes)
	if DB.Error!=nil {
		logger.LogErr(DB.Error)
		return []models.TypeOfCloth{}, DB.Error
	}
	return clothetypes,nil
}

func RemoveType(IDc string) error  {
	DB.Delete(models.TypeOfCloth{ID: IDc})
	if DB.Error!=nil{
		logger.LogErr(DB.Error)
		return DB.Error
	}
	return nil
}